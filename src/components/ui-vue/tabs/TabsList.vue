<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { TabsApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(TabsApiKey);
if (!injectedApi) throw new Error("Tabs parts must be used within <TabsRoot>");
const api = injectedApi;
</script>

<template>
  <div v-bind="api.getListProps()" :class="twMerge(['px-6 flex', className])">
    <slot />
  </div>
</template>
