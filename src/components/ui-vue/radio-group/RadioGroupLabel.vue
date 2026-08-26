<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { RadioGroupApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(RadioGroupApiKey);
if (!injectedApi) throw new Error("RadioGroup parts must be used within <RadioGroupRoot>");
const api = injectedApi;
</script>

<template>
  <div v-bind="api.getLabelProps()" :class="twMerge(['font-bold', className])">
    <slot />
  </div>
</template>
