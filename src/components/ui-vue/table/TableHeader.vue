<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <thead :class="twMerge(['border-b border-primary/30', className])">
    <slot />
  </thead>
</template>
