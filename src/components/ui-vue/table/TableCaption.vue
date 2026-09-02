<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <caption :class="twMerge(['mt-4 text-sm opacity-70', className])">
    <slot />
  </caption>
</template>
