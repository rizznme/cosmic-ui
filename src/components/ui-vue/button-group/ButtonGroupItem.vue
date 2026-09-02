<script setup lang="ts">
import { useAttrs } from "vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as { class?: string };
</script>

<template>
  <button
    v-bind="rawAttrs"
    :class="
      twMerge([
        'px-4 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none',
        rawAttrs.class,
      ])
    "
  >
    <slot />
  </button>
</template>
