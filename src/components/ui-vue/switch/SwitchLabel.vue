<script setup lang="ts">
import { inject } from "vue";
import { SwitchApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(SwitchApiKey);
if (!injectedApi) throw new Error("Switch parts must be used within <SwitchRoot>");
const api = injectedApi;
</script>

<template>
  <span v-bind="api.getLabelProps()" :class="$props.class">
    <slot />
  </span>
</template>
