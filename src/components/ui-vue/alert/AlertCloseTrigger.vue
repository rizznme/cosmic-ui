<script setup lang="ts">
import { inject, useAttrs, computed } from "vue";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui-vue/button.vue";
import { X } from "@lucide/vue";
import { AlertPresentKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as { class?: string };
const attrsWithoutClass = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return rest;
});

const present = inject(AlertPresentKey);
if (!present) throw new Error("AlertCloseTrigger must be used within <AlertRoot>");
</script>

<template>
  <Button
    v-bind="attrsWithoutClass"
    shape="flat"
    variant="accent"
    :class="
      twMerge([
        'absolute -right-1 top-2 px-5 py-1.5 transform scale-x-[-1]',
        '[--color-frame-1-fill:var(--color-accent)]/70',
        rawAttrs.class,
      ])
    "
    @click="present = false"
  >
    <X class="size-4" />
  </Button>
</template>
