<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { class: className, colspan } = defineProps<{ class?: string; colspan?: number }>();
</script>

<template>
  <td :colspan="colspan" :class="twMerge(['p-4 align-middle', className])">
    <slot />
  </td>
</template>
