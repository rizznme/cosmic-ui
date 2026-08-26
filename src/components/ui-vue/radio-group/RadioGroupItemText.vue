<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { RadioGroupApiKey, RadioGroupItemValueKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(RadioGroupApiKey);
if (!injectedApi) throw new Error("RadioGroup parts must be used within <RadioGroupRoot>");
const api = injectedApi;

const value = inject(RadioGroupItemValueKey);
if (value === undefined) throw new Error("RadioGroupItemText must be used within <RadioGroupItem>");
</script>

<template>
  <span v-bind="api.getItemTextProps({ value })" :class="twMerge(['order-2', className])">
    <slot />
  </span>
</template>
