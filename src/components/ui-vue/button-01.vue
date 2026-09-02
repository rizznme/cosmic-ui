<script setup lang="ts">
import { twMerge } from "tailwind-merge";

// inheritAttrs:false + explicit v-bind="$attrs" on the real element (not the
// implicit fallthrough) - see button.vue's docs-page note: without this, an
// incidental prop Astro passes to a top-level island (like slot="preview" on
// the gallery page) lands on the DOM node as a mismatched attribute.
defineOptions({ inheritAttrs: false });
const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <button
    v-bind="$attrs"
    :class="
      twMerge([
        'px-6 py-2.5 font-medium cursor-pointer border border-primary text-primary bg-transparent transition-colors',
        'hover:bg-primary hover:text-primary-foreground',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ])
    "
  >
    <slot />
  </button>
</template>
