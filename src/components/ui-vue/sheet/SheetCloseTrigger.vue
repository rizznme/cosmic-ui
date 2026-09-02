<script setup lang="ts">
import { inject } from "vue";
import { X } from "@lucide/vue";
import { twMerge } from "tailwind-merge";
import { SheetApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(SheetApiKey);
if (!injectedApi) throw new Error("Sheet parts must be used within <SheetRoot>");
const api = injectedApi;
</script>

<template>
  <button
    v-bind="api.getCloseTriggerProps()"
    :class="twMerge(['absolute right-4 top-4 opacity-70 hover:opacity-100 cursor-pointer', className])"
  >
    <X class="size-4" />
  </button>
</template>
