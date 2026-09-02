<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });
const { class: className } = defineProps<{ class?: string }>();

const attrs = useAttrs();
// Astro hands an island's root component an incidental `slot` prop when it's
// placed inside a named <slot> (e.g. `slot="preview"`); forwarding it onto
// the real <button> disagrees between SSR and hydration and Vue flags it as
// a mismatch. Every other attr (onClick, type, disabled, ...) still needs
// through.
const forwardedAttrs = computed(() => {
  const { slot: _slot, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <button
    v-bind="forwardedAttrs"
    :class="
      twMerge([
        'px-6 py-2.5 font-medium cursor-pointer border border-primary bg-primary text-primary-foreground transition-colors',
        'hover:bg-primary/90',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ])
    "
  >
    <slot />
  </button>
</template>
