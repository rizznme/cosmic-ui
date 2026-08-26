<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { MenuApiKey } from "./context";

const { class: className, value } = defineProps<{ class?: string; value: string }>();

const injectedApi = inject(MenuApiKey);
if (!injectedApi) throw new Error("Menu parts must be used within <MenuRoot>");
const api = injectedApi;
</script>

<template>
  <div
    v-bind="api.getItemProps({ value })"
    :class="
      twMerge([
        'cursor-pointer flex items-center -mx-3 -my-0.5 px-3 py-0.5 border border-transparent hover:border-primary/30 hover:bg-primary/10 data-[highlighted]:border-primary/30 data-[highlighted]:bg-primary/10',
        className,
      ])
    "
  >
    <slot />
  </div>
</template>
