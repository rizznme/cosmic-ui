<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { twMerge } from "tailwind-merge";

const { class: className } = defineProps<{ class?: string }>();
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="twMerge(['text-foreground/30', className])">
    <ChevronRight class="size-3.5" />
  </li>
</template>
