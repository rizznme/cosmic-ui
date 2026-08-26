<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { AccordionApiKey, AccordionItemValueKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(AccordionApiKey);
if (!injectedApi) throw new Error("Accordion parts must be used within <AccordionRoot>");
const api = injectedApi;

const value = inject(AccordionItemValueKey);
if (value === undefined) throw new Error("AccordionContent must be used within <AccordionItem>");
</script>

<template>
  <div
    v-bind="api.getItemContentProps({ value })"
    :class="
      twMerge([
        'py-2 mt-1 opacity-80 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0',
        className,
      ])
    "
  >
    <slot />
  </div>
</template>
