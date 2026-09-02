<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const { href, class: className } = defineProps<{ href: string; class?: string }>();
</script>

<template>
  <a :href="href" :class="twMerge(['text-foreground/50 hover:text-foreground', className])">
    <slot />
  </a>
</template>
