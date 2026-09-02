<script setup lang="ts">
import { inject } from "vue";
import { NumberInputApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(NumberInputApiKey);
if (!injectedApi)
  throw new Error("NumberInput parts must be used within <NumberInputRoot>");
const api = injectedApi;
</script>

<template>
  <label v-bind="api.getLabelProps()" :class="$props.class">
    <slot />
  </label>
</template>
