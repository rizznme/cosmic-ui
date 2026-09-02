<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { twMerge } from "tailwind-merge";
import Frame, { parsePaths } from "@/components/ui-vue/frame.vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
// Astro hands an island's root component an incidental `slot` prop when it's
// placed inside a named <slot> (e.g. `slot="preview"`); forwarding it onto
// the real <input> disagrees between SSR and hydration and Vue flags it as a
// mismatch. Every other attr (onClick, id, aria-*, ...) still needs through.
const forwardedAttrs = computed(() => {
  const { slot: _slot, ...rest } = attrs;
  return rest;
});

const framePaths = parsePaths(
  '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","17","0"],["L","100% - 7","0"],["L","100% + 0","0% + 9.5"],["L","100% - 18","100% - 6"],["L","4","100% - 6"],["L","0","100% - 15"],["L","17","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","9","100% - 6"],["L","100% - 22","100% - 6"],["L","100% - 25","100% + 0"],["L","12","100% + 0"],["L","9","100% - 6"]]}]'
);
</script>

<template>
  <div
    :class="
      twMerge([
        'relative',
        '[--color-frame-1-stroke:var(--color-primary)]/70',
        '[--color-frame-1-fill:var(--color-primary)]/10',
        '[--color-frame-2-stroke:transparent]',
        '[--color-frame-2-fill:transparent]',
      ])
    "
  >
    <div class="absolute inset-0 -mb-2 [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]">
      <Frame :paths="framePaths" />
    </div>
    <input
      v-bind="forwardedAttrs"
      class="w-full outline-none px-8 py-2 relative placeholder:text-foreground/70"
    />
  </div>
</template>
