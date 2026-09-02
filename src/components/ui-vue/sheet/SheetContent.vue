<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Portal from "@/components/ui-vue/portal.vue";
import { usePresence } from "@/components/ui-vue/presence";
import { SheetApiKey } from "./context";

type SheetSide = "top" | "right" | "bottom" | "left";

const { class: className, side = "right" } = defineProps<{
  class?: string;
  side?: SheetSide;
}>();

const injectedApi = inject(SheetApiKey);
if (!injectedApi) throw new Error("Sheet parts must be used within <SheetRoot>");
const api = injectedApi;

const backdrop = usePresence(() => api.value.open);
const content = usePresence(() => api.value.open);

// Each side needs its own edge, size, border, and slide direction - the rest
// of the class list (positioning strategy, animation timing, surface) stays
// the same across all four.
const sideClasses: Record<SheetSide, string> = {
  right:
    "inset-y-0 right-0 h-full w-full max-w-sm border-l border-primary/30 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
  left: "inset-y-0 left-0 h-full w-full max-w-sm border-r border-primary/30 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
  top: "inset-x-0 top-0 w-full border-b border-primary/30 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
  bottom:
    "inset-x-0 bottom-0 w-full border-t border-primary/30 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
};
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
            'outline-none fixed z-50 p-6 bg-background overflow-y-auto',
            `[&[data-state='open']]:animate-in [&[data-state='open']]:duration-300`,
            `[&[data-state='closed']]:animate-out [&[data-state='closed']]:duration-250`,
            sideClasses[side],
            className,
          ])
        "
      >
        <slot />
      </div>
    </div>
  </Portal>
</template>
