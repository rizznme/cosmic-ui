<script setup lang="ts">
import { twMerge } from "tailwind-merge";

// See BreadcrumbRoot.vue: without this, Astro's slot="preview" prop (used
// to route this island into a named slot) falls through onto this root DOM
// node inconsistently between SSR and hydration, and Vue flags it as a
// mismatch on every demo page.
defineOptions({ inheritAttrs: false });
const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <div class="relative w-full overflow-x-auto">
    <table :class="twMerge(['w-full border-collapse', className])">
      <slot />
    </table>
  </div>
</template>
