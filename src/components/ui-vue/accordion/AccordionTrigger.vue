<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { ChevronDown, FilePenLine } from "@lucide/vue";
import { AccordionApiKey, AccordionItemValueKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(AccordionApiKey);
if (!injectedApi) throw new Error("Accordion parts must be used within <AccordionRoot>");
const api = injectedApi;

const value = inject(AccordionItemValueKey);
if (value === undefined) throw new Error("AccordionTrigger must be used within <AccordionItem>");
</script>

<template>
  <button
    v-bind="api.getItemTriggerProps({ value })"
    :class="
      twMerge([
        'flex items-center data-[state=open]:text-shadow-lg text-shadow-primary font-bold cursor-pointer w-full group py-2 -my-2 data-[state=open]:pt-3.5 transition-[padding] duration-100',
        className,
      ])
    "
  >
    <FilePenLine class="size-4.5 me-2.5" /> <slot />
    <ChevronDown class="ms-auto size-4 group-data-[state=open]:rotate-180" />
  </button>
</template>
