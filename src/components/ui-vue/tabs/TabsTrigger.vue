<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui-vue/button.vue";
import { TabsApiKey } from "./context";

const { class: className, value } = defineProps<{ class?: string; value: string }>();

const injectedApi = inject(TabsApiKey);
if (!injectedApi) throw new Error("Tabs parts must be used within <TabsRoot>");
const api = injectedApi;

const customPaths = [
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","18","0"],["L","100% + 0","0"],["L","100% - 22","100% - 5.5"],["L","4","100% - 5.5"],["L","0","100% - 15.5"],["L","18","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","10","100% - 6"],["L","100% - 28","100% - 6"],["L","100% - 31","100% + 0"],["L","12","100% + 0"],["L","10","100% - 6"]]}]',
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","22","0"],["L","100% + 0","0"],["L","100% - 22","100% - 5.5"],["L","0","100% - 5.5"],["L","22","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","8","100% - 6"],["L","100% - 26","100% - 6"],["L","100% - 29","100% - 0"],["L","5","100% - 0"],["L","8","100% - 6"]]}]',
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","22","0"],["L","100% - 6","0"],["L","100% - 0","10"],["L","100% - 16","100% - 5.5"],["L","0","100% - 5.5"],["L","22","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","7","100% - 6"],["L","100% - 21","100% - 6"],["L","100% - 24","100% - 0"],["L","3","100% - 0"],["L","7","100% - 6"]]}]',
];
</script>

<template>
  <Button
    v-bind="api.getTriggerProps({ value })"
    :class="
      twMerge([
        'text-nowrap opacity-80 [&>div>svg]:hidden -mr-4',
        'data-[selected]:text-shadow-lg text-shadow-primary',
        'data-[selected]:opacity-100 data-[selected]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        '[&:first-of-type>div>svg:nth-child(1)]:block',
        '[&:not(:first-of-type):not(:last-of-type)>div>svg:nth-child(2)]:block',
        '[&:last-of-type>div>svg:nth-child(3)]:block',
        className,
      ])
    "
    :custom-paths="customPaths"
  >
    <slot />
  </Button>
</template>
