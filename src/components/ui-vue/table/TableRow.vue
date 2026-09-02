<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <tr :class="twMerge(['border-b border-primary/10 hover:bg-primary/5', className])">
    <slot />
  </tr>
</template>
