<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui-vue/button.vue";
import { ChevronDown } from "@lucide/vue";
import { SelectApiKey } from "./context";

const { class: className, placeholder = "Select option..." } = defineProps<{
  class?: string;
  placeholder?: string;
}>();

const injectedApi = inject(SelectApiKey);
if (!injectedApi) throw new Error("Select parts must be used within <SelectRoot>");
const api = injectedApi;
</script>

<template>
  <Button
    v-bind="api.getTriggerProps()"
    :class="twMerge(['w-full min-w-55 px-0 [&>span]:justify-start px-8', className])"
  >
    {{ api.valueAsString || placeholder }}
    <span
      v-bind="api.getIndicatorProps()"
      class="ms-auto transition-transform group-data-[state=open]:rotate-180"
    >
      <ChevronDown class="size-4" />
    </span>
  </Button>
</template>
