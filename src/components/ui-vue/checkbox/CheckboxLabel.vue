<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { CheckboxApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(CheckboxApiKey);
if (!injectedApi) throw new Error("Checkbox parts must be used within <CheckboxRoot>");
const api = injectedApi;
</script>

<template>
  <span v-bind="api.getLabelProps()" :class="twMerge(['order-2', className])">
    <slot />
  </span>
</template>
