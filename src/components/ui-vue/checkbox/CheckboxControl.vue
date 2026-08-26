<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { Check } from "@lucide/vue";
import { CheckboxApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(CheckboxApiKey);
if (!injectedApi) throw new Error("Checkbox parts must be used within <CheckboxRoot>");
const api = injectedApi;

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getControlProps()"
    :class="
      twMerge([
        'group relative size-5 flex items-center justify-center data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[--color-frame-1-stroke:var(--color-primary)]/80',
        '[--color-frame-1-fill:var(--color-primary)]/10',
        className,
      ])
    "
  >
    <Frame :paths="framePaths" />
    <Check
      class="group-data-[state=checked]:opacity-100 opacity-0 size-6 -mt-1 -mr-2 stroke-(--color-primary)/80 drop-shadow-[0_0px_2px_var(--color-primary)] transition-all duration-100"
    />
  </div>
</template>
