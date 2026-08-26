<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "@lucide/vue";
import Button from "@/components/ui-vue/button.vue";
import { MenuApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(MenuApiKey);
if (!injectedApi) throw new Error("Menu parts must be used within <MenuRoot>");
const api = injectedApi;
</script>

<template>
  <Button
    v-bind="api.getTriggerProps()"
    :class="
      twMerge(['data-[state=open]:drop-shadow-[0_0px_20px_var(--color-primary)]', className])
    "
  >
    <slot />
    <span
      v-bind="api.getIndicatorProps()"
      class="ms-auto transition-transform group-data-[state=open]:rotate-180"
    >
      <ChevronDown class="size-4" />
    </span>
  </Button>
</template>
