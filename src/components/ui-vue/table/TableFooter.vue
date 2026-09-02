<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <tfoot :class="twMerge(['border-t border-primary/30 font-medium', className])">
    <slot />
  </tfoot>
</template>
