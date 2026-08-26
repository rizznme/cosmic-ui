<script setup lang="ts">
import { inject, useId } from "vue";
import { twMerge } from "tailwind-merge";
import { ComboboxApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;

const groupId = useId();
</script>

<template>
  <div
    v-bind="api.getItemGroupProps({ id: groupId })"
    :class="twMerge(['relative flex flex-col gap-2.5 px-6 pt-4 pb-7', className])"
  >
    <slot />
  </div>
</template>
