<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <ol :class="twMerge(['flex flex-wrap items-center gap-2 text-sm', className])">
    <slot />
  </ol>
</template>
