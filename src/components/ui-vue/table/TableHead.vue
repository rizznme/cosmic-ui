<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <th :class="twMerge(['h-10 px-4 text-left align-middle font-medium text-foreground/70', className])">
    <slot />
  </th>
</template>
