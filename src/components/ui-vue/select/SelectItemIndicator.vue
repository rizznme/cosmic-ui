<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { Check } from "@lucide/vue";
import { SelectApiKey, SelectItemKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(SelectApiKey);
if (!injectedApi) throw new Error("Select parts must be used within <SelectRoot>");
const api = injectedApi;

const item = inject(SelectItemKey);
if (!item) throw new Error("SelectItemIndicator must be used within <SelectItem>");
</script>

<template>
  <div v-bind="api.getItemIndicatorProps({ item })" :class="twMerge(['ms-auto', className])">
    <Check class="size-3.5" />
  </div>
</template>
