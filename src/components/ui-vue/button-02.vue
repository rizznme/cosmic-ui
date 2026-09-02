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
        'px-6 py-2.5 font-medium cursor-pointer border border-transparent text-foreground bg-transparent transition-colors',
        'hover:bg-foreground/10',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      ])
    "
  >
    <slot />
  </button>
</template>
