<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { ToastApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(ToastApiKey);
if (!injectedApi) throw new Error("Toast parts must be used within <ToastRoot>'s <Toaster>");
const api = injectedApi;

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","35","0"],["L","0% + 70.5","0"],["L","0% + 87.5","7"],["L","0% + 81.5","0% + 0"],["L","100% - 96.5","0% + 0"],["L","100% - 91.5","0% + 3"],["L","100% - 86.5","0% + 0"],["L","100% - 32.5","0% + 0"],["L","100% - 18.5","0% + 10"],["L","100% + 0","100% - 16"],["L","100% - 9","100% - 6"],["L","0% + 12","100% - 6"],["L","0","100% - 17.5"],["L","16","0% + 14.5"],["L","35","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","20","100% - 6"],["L","100% - 19.5","100% - 6"],["L","100% - 25.5","100% + 0"],["L","26","100% + 0"],["L","20","100% - 6"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getRootProps()"
    class="[translate:var(--x)_var(--y)] [scale:var(--scale)] [z-index:var(--z-index)] [height:var(--height)] [opacity:var(--opacity)] [will-change:translate,scale] [transition:translate_400ms,_scale_400ms,_opacity_400ms] [transition-timing-function:cubic-bezier(0.21,_1.02,_0.73,_1)] data-[state=closed]:[transition:translate_400ms,_scale_400ms,_opacity_200ms] data-[state=closed]:[transition-timing-function:cubic-bezier(0.06,_0.71,_0.55,_1)]"
  >
    <div v-bind="api.getGhostBeforeProps()" />
    <div
      :class="
        twMerge([
          'relative me-1 px-10 py-6 font-orbitron text-sm',
          '[--color-frame-1-stroke:var(--color-primary)]',
          '[--color-frame-1-fill:var(--color-primary)]/20',
          '[--color-frame-2-stroke:var(--color-primary)]',
          '[--color-frame-2-fill:var(--color-primary)]/20',
          '[--color-frame-3-stroke:var(--color-accent)]',
          '[--color-frame-3-fill:var(--color-accent)]/35',
          className,
        ])
      "
    >
      <Frame enable-backdrop-blur enable-view-box :paths="framePaths" />
      <slot />
    </div>
    <div v-bind="api.getGhostAfterProps()" />
  </div>
</template>
