<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <tbody :class="twMerge(['[&_tr:last-child]:border-0', className])">
    <slot />
  </tbody>
</template>
