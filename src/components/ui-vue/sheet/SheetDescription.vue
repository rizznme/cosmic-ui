<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { SheetApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(SheetApiKey);
if (!injectedApi) throw new Error("Sheet parts must be used within <SheetRoot>");
const api = injectedApi;
</script>

<template>
  <div v-bind="api.getDescriptionProps()" :class="twMerge(['opacity-80 py-2', className])">
    <slot />
  </div>
</template>
