<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { AvatarApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(AvatarApiKey);
if (!injectedApi) throw new Error("Avatar parts must be used within <AvatarRoot>");
const api = injectedApi;
</script>

<template>
  <span v-bind="api.getFallbackProps()" :class="twMerge(['text-sm font-medium', $props.class])">
    <slot />
  </span>
</template>
