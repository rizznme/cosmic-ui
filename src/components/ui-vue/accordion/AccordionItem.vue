<script setup lang="ts">
import { inject, provide } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { AccordionApiKey, AccordionItemValueKey } from "./context";

const { class: className, value } = defineProps<{ class?: string; value: string }>();

const injectedApi = inject(AccordionApiKey);
if (!injectedApi) throw new Error("Accordion parts must be used within <AccordionRoot>");
const api = injectedApi;

provide(AccordionItemValueKey, value);

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","15","0"],["L","100% - 0","0"],["L","100% - 0","100% - 7"],["L","0% + 0","100% - 7"],["L","0% + 0","0% + 15"],["L","15","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","7","100% - 7"],["L","100% - 8","100% - 7"],["L","100% - 14","100% + 0"],["L","12","100% + 0"],["L","7","100% - 7"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getItemProps({ value })"
    :class="
      twMerge([
        'relative px-6 pt-3 pb-5 data-[state=open]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[--color-frame-1-stroke:var(--color-primary)]',
        '[--color-frame-1-fill:var(--color-primary)]/20',
        '[--color-frame-2-stroke:var(--color-primary)]',
        '[--color-frame-2-fill:transparent]',
        className,
      ])
    "
  >
    <Frame :paths="framePaths" />
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
