<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });
const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <button
    v-bind="$attrs"
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
