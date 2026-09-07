import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Zap } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { Frame, parseFrameSet } from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { setShowMenu } from "@/lib/mobile-menu-store";
import { setSearchOpen } from "@/lib/search-palette-store";

// The topbar has 4 slots left-to-right: left-wedge, pill (logo+nav), search
// box, right-wedge. Keyed here by literal "Frame N" -- the same names the
// Cosmic UI editor exports them under ("Export all Frames") -- so a fresh
// paste from there drops in with no renaming.
const topbarFrames = parseFrameSet(
  '{"Frame 1":[{"name":"Layer 1","style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","0","0"],["L","100% - 7","0"],["L","100% - 12","6"],["L","100% - 0","28"],["L","0","9"],["L","0","0"]]},{"name":"Layer 5","style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","100% - 8","31"],["L","0","12"]]}],"Frame 2":[{"name":"Layer 1","style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","5","0"],["L","0","6"],["L","27","100% - 16"],["L","154","100% - 16"],["L","164","100% - 30"],["L","162","100% - 16"],["L","100% - 28","100% - 16"],["L","100% - 0","6"],["L","100% - 6","0"],["L","5","0"]]},{"name":"Layer 2","style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","32","100% - 15"],["L","37","100% - 7"],["L","152","100% - 7"],["L","166","100% - 25"],["L","164","100% - 7"],["L","100% - 36","100% - 7"],["L","100% - 33","100% - 15"]]},{"name":"Layer 3","style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","4","31"],["L","18","100% - 12"],["L","23","100% - 12"],["L","29","100% - 0"],["L","155","100% - 0"],["L","160","100% - 9"],["L","160","100% - 0"],["L","100% - 29","100% - 0"],["L","100% - 24","100% - 12"]]}],"Frame 3":[{"name":"Layer 1","style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","20","0"],["L","100% - 4","0"],["L","100% - 0","5"],["L","100% - 36","100% - 21"],["L","0","100% - 21"],["L","26","6"],["L","20","0"]]},{"name":"Layer 7","style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","2","100% - 12"],["L","9","100% - 12"],["L","12","100% - 15"],["L","100% - 33","100% - 14"]]}],"Frame 4":[{"name":"Layer 1","style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","0","100% - 14"],["L","17","34"],["L","100% - 0","18"]]},{"name":"Layer 10","style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","29","0"],["L","100% - 0","0"],["L","100% - 0","14"],["L","14","28"],["L","33","5"],["L","29","0"]]}]}',
);

export function SiteChrome() {
  // Matches getServerFramework's pattern: a platform-specific label would
  // differ between server and first client render (no navigator during SSR),
  // so start neutral and only swap to the Mac glyph once mounted.
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl+K");

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
    if (isMac) setShortcutLabel("⌘K");

    function handleKeyDown(e: KeyboardEvent) {
      const isShortcut =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (!isShortcut) return;
      e.preventDefault();
      setSearchOpen(true);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="h-18 mt-2 mx-2 lg:-mt-px lg:-mx-px flex fixed top-0 inset-x-0 z-50">
        <div
          className={twMerge([
            "size-full relative hidden lg:block -mr-[12px]",
            "[--color-frame-1-stroke:var(--color-primary)]/90",
            "[--color-frame-1-fill:var(--color-primary)]/8",
            "[--color-frame-2-stroke:var(--color-primary)]/23",
            "[--color-frame-2-fill:transparent]",
          ])}
        >
          <Frame
            className="drop-shadow-2xl drop-shadow-primary"
            frames={topbarFrames}
            frame="Frame 1"
          />
        </div>
        <div className="flex lg:container h-full relative flex-none w-full">
          <div
            className={twMerge([
              "flex-none h-full px-14 relative w-full lg:w-auto -mr-[26px]",
              "[--color-frame-1-stroke:var(--color-primary)]",
              "[--color-frame-1-fill:var(--color-primary)]/20",
              "[--color-frame-2-stroke:var(--color-primary)]/57",
              "[--color-frame-2-fill:transparent]",
              "[--color-frame-3-stroke:var(--color-primary)]/23",
              "[--color-frame-3-fill:transparent]",
            ])}
          >
            <Frame
              enableBackdropBlur
              className="drop-shadow-2xl drop-shadow-primary/40"
              frames={topbarFrames}
              frame="Frame 2"
            />
            <div className="flex items-center mt-4.5 relative">
              <a
                href="/"
                className="me-16 font-bold text-shadow-lg text-shadow-primary"
              >
                COSMIC UI
              </a>
              <div className="hidden lg:flex gap-8 font-medium [&>a]:hover:text-shadow-lg [&>a]:hover:text-shadow-primary/40">
                <a
                  className="hover:text-shadow-lg hover:text-shadow-primary/50"
                  href="/docs"
                >
                  Docs
                </a>
                <a
                  className="hover:text-shadow-lg hover:text-shadow-primary/50"
                  href="/components"
                >
                  Components
                </a>
                <a
                  className="hover:text-shadow-lg hover:text-shadow-primary/50"
                  href="/docs/colors"
                >
                  Colors
                </a>
              </div>
              <div
                onClick={() => setShowMenu(true)}
                className="cursor-pointer ms-auto flex items-center gap-2 lg:hidden font-medium"
              >
                <Zap className="size-4" />
                Menu
              </div>
            </div>
          </div>
          <div
            className={twMerge([
              "w-full relative lg:flex justify-end pe-8 hidden",
              "[--color-frame-1-stroke:var(--color-primary)]",
              "[--color-frame-1-fill:var(--color-primary)]/10",
              "[--color-frame-2-stroke:var(--color-primary)]/23",
              "[--color-frame-2-fill:transparent]",
            ])}
          >
            <Frame
              enableBackdropBlur
              className="drop-shadow-2xl drop-shadow-primary/40"
              frames={topbarFrames}
              frame="Frame 3"
            />
            <div className="flex items-center -mt-3.5">
              <Button
                shape="flat"
                onClick={() => setSearchOpen(true)}
                className="font-normal px-9 py-[0.45rem] text-xs text-foreground [--color-frame-1-stroke:var(--color-primary)]/50 [--color-frame-1-fill:var(--color-primary)]/8"
              >
                <div className="me-10">Search Docs…</div>
                <div className="ms-auto">{shortcutLabel}</div>
              </Button>
              <a target="_blank" href="https://github.com/rizznme/cosmic-ui">
                <Button
                  shape="flat"
                  className="py-[0.45rem] px-6 ms-1 text-foreground [--color-frame-1-stroke:var(--color-accent)]/50 [--color-frame-1-fill:var(--color-accent)]/20"
                >
                  <GithubIcon className="size-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div
          className={twMerge([
            "size-full relative hidden lg:block -ml-[33px]",
            "[--color-frame-1-stroke:var(--color-primary)]/90",
            "[--color-frame-1-fill:var(--color-primary)]/8",
            "[--color-frame-2-stroke:var(--color-primary)]/23",
            "[--color-frame-2-fill:transparent]",
            "[--color-frame-3-stroke:var(--color-primary)]/23",
            "[--color-frame-3-fill:transparent]",
          ])}
        >
          <Frame frames={topbarFrames} frame="Frame 4" />
        </div>
      </div>
    </>
  );
}
