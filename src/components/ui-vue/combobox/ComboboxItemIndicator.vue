<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { Check } from "@lucide/vue";
import { ComboboxApiKey, ComboboxItemKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;

const item = inject(ComboboxItemKey);
if (!item) throw new Error("ComboboxItemIndicator must be used within <ComboboxItem>");
</script>

<template>
  <div v-bind="api.getItemIndicatorProps({ item })" :class="twMerge(['ms-auto', className])">
    <Check class="size-3.5" />
  </div>
</template>
