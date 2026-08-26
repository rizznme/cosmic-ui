<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui-vue/button.vue";
import { X } from "@lucide/vue";
import { ToastApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(ToastApiKey);
if (!injectedApi) throw new Error("Toast parts must be used within <ToastRoot>'s <Toaster>");
const api = injectedApi;
</script>

<template>
  <Button
    v-bind="api.getCloseTriggerProps()"
    shape="flat"
    variant="accent"
    enable-view-box
    :class="
      twMerge([
        'absolute right-2 -top-1.5 px-4 py-1.5 transform scale-x-[-1]',
        '[--color-frame-1-fill:var(--color-accent)]/70',
        className,
      ])
    "
  >
    <X class="size-4" />
  </Button>
</template>
