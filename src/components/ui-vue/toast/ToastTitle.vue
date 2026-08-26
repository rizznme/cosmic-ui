<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { ToastApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(ToastApiKey);
if (!injectedApi) throw new Error("Toast parts must be used within <ToastRoot>'s <Toaster>");
const api = injectedApi;
</script>

<template>
  <div
    v-bind="api.getTitleProps()"
    :class="
      twMerge([
        'flex items-center text-shadow-lg text-shadow-primary font-bold w-full relative text-nowrap',
        className,
      ])
    "
  >
    <slot />
  </div>
</template>
