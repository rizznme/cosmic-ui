<script setup lang="ts">
import { inject, provide } from "vue";
import { twMerge } from "tailwind-merge";
import { RadioGroupApiKey, RadioGroupItemValueKey } from "./context";

const { class: className, value } = defineProps<{ class?: string; value: string }>();

const injectedApi = inject(RadioGroupApiKey);
if (!injectedApi) throw new Error("RadioGroup parts must be used within <RadioGroupRoot>");
const api = injectedApi;

provide(RadioGroupItemValueKey, value);
</script>

<template>
  <label
    v-bind="api.getItemProps({ value })"
    :class="twMerge(['flex gap-3.5 items-center cursor-pointer', className])"
  >
    <slot />
    <input v-bind="api.getItemHiddenInputProps({ value })" />
  </label>
</template>
