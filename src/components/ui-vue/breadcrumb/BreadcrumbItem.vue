<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <li :class="twMerge(['flex items-center gap-2', className])">
    <slot />
  </li>
</template>
