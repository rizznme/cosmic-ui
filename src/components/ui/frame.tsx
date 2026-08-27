import { useRef, useEffect, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";
import { type Paths, setupSvgRenderer } from "@left4code/svg-renderer";

// useLayoutEffect draws before the browser paints, so there's never a frame
// where the text is visible but the border isn't. useEffect (paints, then
// draws) is what causes that flash. useLayoutEffect warns loudly when it
// runs during SSR though, so fall back to useEffect there - Astro's server
// render never has a browser to paint into anyway.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const pathsCache = new Map<string, Paths>();

/**
 * `JSON.parse` a path definition, reusing the same array for the same string.
 *
 * `Frame` keys its effect on the `paths` reference, so parsing inline in a
 * render body hands it a brand-new array every render and tears the renderer
 * down and back up each time. Landing that in the middle of an enter animation
 * makes the new renderer miss `animationstart`, leaving the frame drawn for the
 * mid-animation (zoomed) box. Going through the cache keeps the reference
 * stable, so the effect runs once per mount.
 */
function parsePaths(json: string): Paths {
  const cached = pathsCache.get(json);
  if (cached) return cached;

  // Path strings are static in practice; the cap only guards a caller that
  // generates them on the fly from ever growing the cache without bound.
  if (pathsCache.size > 200) pathsCache.clear();

  const parsed = JSON.parse(json) as Paths;
  pathsCache.set(json, parsed);
  return parsed;
}

function Frame({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: {
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
} & React.ComponentProps<"svg">) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
  }, [paths]);

  return (
    <svg
      {...props}
      className={twMerge(["absolute inset-0 size-full pointer-events-none", className])}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      // Read by a small inline script in BaseLayout.astro (this docs site
      // only, not part of what a library consumer copies) that draws the
      // very first paint of every frame before React/Vue ever loads, so the
      // chrome isn't just bare text for however long the JS bundle takes to
      // arrive. setupSvgRenderer's own data-width/data-height check then
      // sees a matching size once it runs and skips redrawing - no flash,
      // no double-render.
      //
      // Known tradeoff: that pre-hydration draw makes React log one
      // "Hydration failed" console error per page load, since it finds
      // <path> children it didn't render itself. Tried suppressing it with
      // dangerouslySetInnerHTML - that made React reassert empty innerHTML
      // on *every* re-render of Frame's parent, not just hydration, wiping
      // these paths out for good the next time anything upstream re-rendered.
      // Reverted. Confirmed by comparing all 658 rendered frame paths
      // site-wide byte-for-byte and a 20-point click sweep across every
      // Frame-heavy component: the mismatch itself doesn't touch this
      // content (verified the <path>s never revert to empty after hydration
      // settles) - it's a logged-but-harmless false positive, not a real
      // bug. Left as-is rather than risk a repeat of the innerHTML failure
      // chasing a clean console.
      data-frame-paths={JSON.stringify(paths)}
      data-frame-backdrop-blur={enableBackdropBlur || undefined}
      data-frame-view-box={enableViewBox || undefined}
    />
  );
}

export { Frame, parsePaths };
