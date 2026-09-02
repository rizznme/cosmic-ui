<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Portal from "@/components/ui-vue/portal.vue";
import { usePresence } from "@/components/ui-vue/presence";
import { AlertDialogApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(AlertDialogApiKey);
if (!injectedApi)
  throw new Error("AlertDialog parts must be used within <AlertDialogRoot>");
const api = injectedApi;

const backdrop = usePresence(() => api.value.open);
const content = usePresence(() => api.value.open);
</script>

<template>
  <Portal>
    <div
      v-bind="api.getBackdropProps()"
      :ref="backdrop.setNode"
      :hidden="!backdrop.present.value"
      class="fixed inset-0 bg-background/80 z-50 [&[data-state='open']]:animate-in [&[data-state='open']]:fade-in-0 [&[data-state='closed']]:animate-out [&[data-state='closed']]:fade-out-0"
    />
    <div v-bind="api.getPositionerProps()">
      <div
        v-bind="api.getContentProps()"
        :ref="content.setNode"
        :hidden="!content.present.value"
        :class="
          twMerge([
            `outline-none fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] sm:max-w-lg p-6 border border-primary/30 bg-background`,
            `[&[data-state='open']]:animate-in [&[data-state='open']]:fade-in-0 [&[data-state='open']]:zoom-in-80 [&[data-state='open']]:duration-250`,
            `[&[data-state='closed']]:animate-out [&[data-state='closed']]:fade-out-0 [&[data-state='closed']]:zoom-out-80 [&[data-state='closed']]:duration-400`,
            className,
          ])
        "
      >
        <slot />
      </div>
    </div>
  </Portal>
</template>
