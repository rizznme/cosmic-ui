<script lang="ts">
import type { Paths } from "@left4code/svg-renderer";

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

/**
 * Several Frames designed together as one composite (e.g. a topbar made of
 * a left wedge, a pill, a search box, and a right wedge), keyed by name.
 * Each entry is exactly a `Paths` array, unchanged - a set is just a bundle
 * of them for convenience, not a different rendering concept: every path's
 * position is already relative to its own Frame's box (that's what the
 * "100% - N" expressions mean), never to its siblings, so picking one out
 * of the set to render is no different than passing that entry as `paths`
 * directly.
 */
type FrameSet = Record<string, Paths>;

const frameSetCache = new Map<string, FrameSet>();

/** Same caching rationale as parsePaths(), for a `frames` bundle instead. */
function parseFrameSet(json: string): FrameSet {
  const cached = frameSetCache.get(json);
  if (cached) return cached;

  if (frameSetCache.size > 200) frameSetCache.clear();

  const parsed = JSON.parse(json) as FrameSet;
  frameSetCache.set(json, parsed);
  return parsed;
}

export { parsePaths, parseFrameSet };
export type { FrameSet };
</script>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted, useAttrs } from "vue";
import { twMerge } from "tailwind-merge";
import { setupSvgRenderer } from "@left4code/svg-renderer";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  class?: string;
  /** A single Frame's paths. Omit this and pass `frames` + `frame` instead
   *  to pick one out of a set designed together. */
  paths?: Paths;
  /** A bundle from parseFrameSet()/exported by the editor's "Export all
   *  Frames" - pair with `frame` to pick which one this instance renders. */
  frames?: FrameSet;
  /** Which key of `frames` to render. Ignored if `paths` is given. */
  frame?: string;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
}>();

const resolvedPaths = computed(() => props.paths ?? (props.frames && props.frame ? props.frames[props.frame] : undefined));

const attrs = useAttrs();
// Astro hands an island's root component an incidental `slot` prop when it's
// placed inside a named <slot> (e.g. `slot="preview"`); forwarding it onto
// the real <svg> disagrees between SSR and hydration and Vue flags it as a
// mismatch. Every other attr still needs through.
const forwardedAttrs = computed(() => {
  const { slot: _slot, ...rest } = attrs;
  return rest;
});

const svgRef = ref<SVGSVGElement | null>(null);
let instance: ReturnType<typeof setupSvgRenderer> | null = null;

watch(
  [svgRef, resolvedPaths],
  ([el, paths]) => {
    instance?.destroy();
    instance = null;
    if (el && el.parentElement && paths) {
      instance = setupSvgRenderer({
        el,
        paths,
        enableBackdropBlur: props.enableBackdropBlur,
        enableViewBox: props.enableViewBox,
      });
    }
  },
  { immediate: true }
);

onUnmounted(() => instance?.destroy());
</script>

<template>
  <svg
    ref="svgRef"
    v-bind="forwardedAttrs"
    xmlns="http://www.w3.org/2000/svg"
    :class="twMerge(['absolute inset-0 size-full pointer-events-none', props.class])"
    :data-frame-paths="JSON.stringify(resolvedPaths)"
    :data-frame-backdrop-blur="enableBackdropBlur || undefined"
    :data-frame-view-box="enableViewBox || undefined"
  />
</template>
