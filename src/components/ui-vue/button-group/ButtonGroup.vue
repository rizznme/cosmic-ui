<script setup lang="ts">
import { twMerge } from "tailwind-merge";

// See BreadcrumbRoot.vue: without this, Astro's `slot="preview"` prop (used
// to route this island into a named slot) falls through onto this root DOM
// node inconsistently between SSR and hydration, and Vue flags it as a
// mismatch on every demo page.
defineOptions({ inheritAttrs: false });
const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <div
    role="group"
    :class="twMerge(['inline-flex divide-x divide-primary/30 border border-primary/30', className])"
  >
    <slot />
  </div>
</template>
