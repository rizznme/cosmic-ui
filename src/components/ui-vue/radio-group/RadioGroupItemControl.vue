<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { RadioGroupApiKey, RadioGroupItemValueKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(RadioGroupApiKey);
if (!injectedApi) throw new Error("RadioGroup parts must be used within <RadioGroupRoot>");
const api = injectedApi;

const value = inject(RadioGroupItemValueKey);
if (value === undefined) throw new Error("RadioGroupItemControl must be used within <RadioGroupItem>");

const outerPaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
);
const innerPaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getItemControlProps({ value })"
    :class="
      twMerge([
        'group relative size-5 flex items-center justify-center data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[--color-frame-1-stroke:var(--color-primary)]/70',
        '[--color-frame-1-fill:var(--color-primary)]/10',
        className,
      ])
    "
  >
    <Frame :paths="outerPaths" />
    <div
      class="group-data-[state=checked]:opacity-100 opacity-0 relative size-3 transition-all duration-100 [--color-frame-1-stroke:var(--color-primary)] [--color-frame-1-fill:var(--color-primary)]/30"
    >
      <Frame :paths="innerPaths" />
    </div>
  </div>
</template>
