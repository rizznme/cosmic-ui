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

export { parsePaths };
</script>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import { twMerge } from "tailwind-merge";
import { setupSvgRenderer } from "@left4code/svg-renderer";

const props = defineProps<{
  class?: string;
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
}>();

const svgRef = ref<SVGSVGElement | null>(null);
let instance: ReturnType<typeof setupSvgRenderer> | null = null;

watch(
  [svgRef, () => props.paths],
  ([el, paths]) => {
    instance?.destroy();
    instance = null;
    if (el && el.parentElement) {
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
    xmlns="http://www.w3.org/2000/svg"
    :class="twMerge(['absolute inset-0 size-full pointer-events-none', props.class])"
  />
</template>
