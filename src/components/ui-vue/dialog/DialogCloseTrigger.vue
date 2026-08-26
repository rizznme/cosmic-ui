<script setup lang="ts">
import { inject, useSlots } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui-vue/button.vue";
import { X } from "@lucide/vue";
import { DialogApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(DialogApiKey);
if (!injectedApi) throw new Error("Dialog parts must be used within <DialogRoot>");
const api = injectedApi;

// React's `asChild` clones its child element to merge in the close-trigger
// props, avoiding an extra wrapper. Vue has no built-in equivalent, so a
// custom trigger element is provided via a scoped slot instead: bind
// `triggerProps` onto your own element rather than wrapping <DialogCloseTrigger>
// around it.
const hasCustomTrigger = !!useSlots().default;
</script>

<template>
  <slot v-if="hasCustomTrigger" :trigger-props="api.getCloseTriggerProps()" />
  <Button
    v-else
    shape="flat"
    v-bind="api.getCloseTriggerProps()"
    :class="
      twMerge([
        'absolute right-0 top-0 px-5 py-1.5 transform scale-x-[-1] drop-shadow-[0_0px_20px_var(--color-accent)]',
        '[--color-frame-1-stroke:var(--color-accent)]',
        '[--color-frame-1-fill:var(--color-accent)]/50',
        className,
      ])
    "
  >
    <X class="size-4" />
  </Button>
</template>
