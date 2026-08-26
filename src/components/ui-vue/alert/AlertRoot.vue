<script setup lang="ts">
import { ref, provide, useAttrs, computed } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";
import { usePresence } from "@/components/ui-vue/presence";
import { AlertPresentKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as { class?: string };
const attrsWithoutClass = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return rest;
});

const present = ref(true);
provide(AlertPresentKey, present);

const presence = usePresence(() => present.value);

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","0% + 34","7"],["L","0% + 79.5","7"],["L","0% + 96.5","13"],["L","100% - 21.5","13"],["L","100% + 0","34"],["L","100% - 13","100% - 15"],["L","100% - 26","100% - 6"],["L","0% + 11.5","100% - 6"],["L","0","100% - 18"],["L","13","0% + 28"],["L","34","7"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","18","100% - 6"],["L","100% - 33.5","100% - 6"],["L","100% - 39.5","100% - 0"],["L","24","100% + 0"],["L","18","100% - 6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","17","7"],["L","0% + 26.5","7"],["L","0% + 12.5","0% + 20"],["L","13","0% + 11"],["L","17","7"]]}]'
);
</script>

<template>
  <div
    v-bind="attrsWithoutClass"
    :ref="presence.setNode"
    :hidden="!presence.present.value"
    :data-state="present ? 'open' : 'closed'"
    :class="
      twMerge([
        'relative px-10 pt-8 pb-6.5 w-full [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200',
        '[--color-frame-1-stroke:var(--color-primary)]',
        '[--color-frame-1-fill:var(--color-primary)]/20',
        '[--color-frame-2-stroke:var(--color-primary)]',
        '[--color-frame-2-fill:transparent]',
        '[--color-frame-3-stroke:var(--color-accent)]',
        '[--color-frame-3-fill:var(--color-accent)]/50',
        rawAttrs.class,
      ])
    "
  >
    <Frame :paths="framePaths" />
    <slot />
  </div>
</template>
