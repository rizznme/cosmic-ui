<script setup lang="ts">
import { inject } from "vue";
import { SelectApiKey, SelectItemKey } from "./context";

const injectedApi = inject(SelectApiKey);
if (!injectedApi) throw new Error("Select parts must be used within <SelectRoot>");
const api = injectedApi;

const item = inject(SelectItemKey);
if (!item) throw new Error("SelectItemText must be used within <SelectItem>");
</script>

<template>
  <div v-bind="api.getItemTextProps({ item })">
    <slot />
  </div>
</template>
