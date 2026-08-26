<script setup lang="ts">
import { inject } from "vue";
import { ComboboxApiKey, ComboboxItemKey } from "./context";

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;

const item = inject(ComboboxItemKey);
if (!item) throw new Error("ComboboxItemText must be used within <ComboboxItem>");
</script>

<template>
  <div v-bind="api.getItemTextProps({ item })">
    <slot />
  </div>
</template>
