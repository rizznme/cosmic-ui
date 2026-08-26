<script setup lang="ts">
import { computed, inject } from "vue";
import { twMerge } from "tailwind-merge";
import Portal from "@/components/ui-vue/portal.vue";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { usePresence } from "@/components/ui-vue/presence";
import { MenuApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(MenuApiKey);
if (!injectedApi) throw new Error("Menu parts must be used within <MenuRoot>");
const api = injectedApi;

const presence = usePresence(() => api.value.open);

const positionerStyle = computed(() => ({
  ...api.value.getPositionerProps().style,
  zIndex: 70,
}));

const framePaths = parsePaths(
  '[{"show":false,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","14","6"],["L","50% - 7","6"],["L","50% - 2","0"],["L","50% + 4","0"],["L","50% + 9","6"],["L","100% - 13","6"],["L","100% + 0","19"],["L","100% + 0","100% - 26"],["L","100% - 13","100% - 12"],["L","50% + 13","100% - 12"],["L","50% - 0","100% + 0"],["L","0% + 14","100% + 0"],["L","0% + 0","100% - 13"],["L","0","0% + 19"],["L","14","6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","50% + 16","100% - 8"],["L","50% + 25","100% - 8"],["L","50% + 18","100% - 2"],["L","50% + 9","100% - 2"],["L","50% + 16","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","50% + 30","100% - 8"],["L","50% + 37","100% - 8"],["L","50% + 32","100% - 3"],["L","50% + 25","100% - 3"],["L","50% + 30","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-4-stroke)","fill":"var(--color-frame-4-fill)"},"path":[["M","50% + 42","100% - 8"],["L","50% + 48","100% - 8"],["L","50% + 44","100% - 4"],["L","50% + 38","100% - 4"],["L","50% + 42","100% - 8"]]}]'
);
</script>

<template>
  <Portal>
    <div v-bind="api.getPositionerProps()" :style="positionerStyle">
      <div
        v-bind="api.getContentProps()"
        :ref="presence.setNode"
        :hidden="!presence.present.value"
        :class="
          twMerge([
            'group relative min-w-(--reference-width) px-6 py-7 outline-none mt-1.5',
            `[&[data-state='open']]:animate-in [&[data-state='open']]:zoom-in-80 [&[data-state='open']]:fade-in-0 [&[data-state='open']]:duration-200 [&[data-state='open'][data-placement='bottom-start']]:slide-in-from-top-2 [&[data-state='open'][data-placement='left-start']]:slide-in-from-right-2 [&[data-state='open'][data-placement='right-start']]:slide-in-from-left-2 [&[data-state='open'][data-placement='top-start']]:slide-in-from-bottom-2`,
            `[&[data-state='closed']]:animate-out [&[data-state='closed']]:zoom-out-80 [&[data-state='closed']]:fade-out-0 [&[data-state='closed']]:duration-200`,
            '[--color-frame-1-stroke:var(--color-primary)]',
            '[--color-frame-1-fill:var(--color-primary)]/20',
            '[--color-frame-2-stroke:var(--color-accent)]',
            '[--color-frame-2-fill:var(--color-accent)]/40',
            '[--color-frame-3-stroke:var(--color-accent)]',
            '[--color-frame-3-fill:var(--color-accent)]/40',
            '[--color-frame-4-stroke:var(--color-accent)]',
            '[--color-frame-4-fill:var(--color-accent)]/40',
            className,
          ])
        "
      >
        <div class="absolute inset-0 group-data-[placement=top-start]:scale-y-[-1]">
          <Frame :paths="framePaths" enable-backdrop-blur />
        </div>
        <div class="relative flex flex-col gap-2.5">
          <slot />
        </div>
      </div>
    </div>
  </Portal>
</template>
