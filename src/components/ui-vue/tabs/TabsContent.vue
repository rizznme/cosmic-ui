<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { TabsApiKey } from "./context";

const { class: className, value } = defineProps<{ class?: string; value: string }>();

const injectedApi = inject(TabsApiKey);
if (!injectedApi) throw new Error("Tabs parts must be used within <TabsRoot>");
const api = injectedApi;

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","19","0"],["L","100% - 18","0"],["L","100% + 0","0% + 18.5"],["L","100% + 0","50% - 21.119592875318066%"],["L","100% - 8","50% - 19.338422391857506%"],["L","100% - 8","50% + 17.557251908396946%"],["L","100% + 0","100% - 30.15267175572519%"],["L","100% + 0","100% - 22.5"],["L","100% - 17","100% - 7.5"],["L","50% + 17.16417910447761%","100% - 7.5"],["L","50% + 15.298507462686567%","100% - 15.5"],["L","50% - 14.552238805970148%","100% - 15.5"],["L","50% - 16.417910447761194%","100% - 6.5"],["L","0% + 17","100% - 7.5"],["L","0% + 0","100% - 24.5"],["L","0% + 0","50% + 19.84732824427481%"],["L","0% + 9","50% + 17.557251908396946%"],["L","0% + 10","50% - 18.829516539440203%"],["L","0","50% - 21.62849872773537%"],["L","0","0% + 19.5"],["L","19","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","28","100% - 7.000000000000057"],["L","50% - 16.417910447761194%","100% - 7"],["L","50% - 14.552238805970148%","100% - 15.5"],["L","50% + 15.298507462686567%","100% - 15.5"],["L","50% + 17.16417910447761%","100% - 7.5"],["L","100% - 26","100% - 7.5"],["L","100% - 33","100% + 0"],["L","50% + 16.23134328358209%","100% - 1.1368683772161605"],["L","50% + 14.552238805970148%","100% - 8"],["L","50% - 13.619402985074627%","100% - 8"],["L","50% - 15.111940298507463%","100% + 0"],["L","33","100% + 0"],["L","28","100% - 7"]]}]'
);
</script>

<template>
  <div
    v-bind="api.getContentProps({ value })"
    :class="
      twMerge([
        'relative px-10 pt-5 pb-10 min-h-50 w-full data-[selected]:animate-in data-[selected]:fade-in-0 data-[selected]:zoom-in-80 data-[selected]:duration-500',
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
      <p><slot /></p>
    </div>
  </div>
</template>
