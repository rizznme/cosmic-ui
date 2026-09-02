<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { AlertDialogApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(AlertDialogApiKey);
if (!injectedApi)
  throw new Error("AlertDialog parts must be used within <AlertDialogRoot>");
const api = injectedApi;
</script>

<template>
  <div v-bind="api.getDescriptionProps()" :class="twMerge(['opacity-80 py-2', className])">
    <slot />
  </div>
</template>
