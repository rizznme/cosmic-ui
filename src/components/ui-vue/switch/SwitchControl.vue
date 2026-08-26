<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { SwitchApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(SwitchApiKey);
if (!injectedApi) throw new Error("Switch parts must be used within <SwitchRoot>");
const api = injectedApi;

const trackPaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","11","0"],["L","100% + 0","0"],["L","100% + 0","100% + 0"],["L","0","100% + 0"],["L","0","0% + 12"],["L","11","0"]]}]'
);
const thumbPaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","7","0"],["L","100% + 0","0"],["L","100% + 0","100% + 0"],["L","0","100% + 0"],["L","0","0% + 7"],["L","7","0"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getControlProps()"
    :class="
      twMerge([
        'group relative w-14 h-6 flex items-center p-1 cursor-pointer',
        '[--color-frame-1-stroke:var(--color-primary)]/70',
        '[--color-frame-1-fill:var(--color-primary)]/10',
        'data-[state=checked]:[--color-frame-1-stroke:var(--color-primary)]',
        'data-[state=checked]:[--color-frame-1-fill:var(--color-primary)]/20',
        className,
      ])
    "
  >
    <div class="absolute inset-0 z-[-1]">
      <Frame :paths="trackPaths" />
    </div>
    <div
      v-bind="api.getThumbProps()"
      class="relative w-1/2 h-3.5 z-[-1] -mb-px transition-all ms-0.5 [--color-frame-1-stroke:var(--color-primary)]/80 [--color-frame-1-fill:var(--color-primary)]/20 group-data-[state=checked]:[--color-frame-1-stroke:var(--color-primary)] group-data-[state=checked]:[--color-frame-1-fill:var(--color-primary)]/30 group-data-[state=checked]:ms-[47%] group-data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]"
    >
      <Frame :paths="thumbPaths" />
    </div>
  </div>
</template>
