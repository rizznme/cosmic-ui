<script setup lang="ts">
import { inject } from "vue";
import { Minus, Plus } from "@lucide/vue";
import { twMerge } from "tailwind-merge";
import { NumberInputApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(NumberInputApiKey);
if (!injectedApi)
  throw new Error("NumberInput parts must be used within <NumberInputRoot>");
const api = injectedApi;
</script>

<template>
  <div
    v-bind="api.getControlProps()"
    :class="
      twMerge(['flex items-center border border-primary/30 bg-primary/10 w-fit', className])
    "
  >
    <button
      v-bind="api.getDecrementTriggerProps()"
      class="px-2.5 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
    >
      <Minus class="size-3.5" />
    </button>
    <input v-bind="api.getInputProps()" class="w-16 text-center outline-none bg-transparent py-2" />
    <button
      v-bind="api.getIncrementTriggerProps()"
      class="px-2.5 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
    >
      <Plus class="size-3.5" />
    </button>
  </div>
</template>
