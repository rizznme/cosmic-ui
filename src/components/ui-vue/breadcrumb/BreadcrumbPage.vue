<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <span aria-current="page" :class="twMerge(['text-foreground', className])">
    <slot />
  </span>
</template>
