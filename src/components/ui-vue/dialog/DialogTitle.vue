<script setup lang="ts">
import { inject, useAttrs, computed } from "vue";
import { twMerge } from "tailwind-merge";
import { DialogApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as { class?: string };
const attrsWithoutClass = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return rest;
});

const injectedApi = inject(DialogApiKey);
if (!injectedApi) throw new Error("Dialog parts must be used within <DialogRoot>");
const api = injectedApi;
</script>

<template>
  <div
    v-bind="{ ...api.getTitleProps(), ...attrsWithoutClass }"
    :class="
      twMerge([
        'font-medium text-shadow-lg text-shadow-primary font-bold text-lg relative',
        rawAttrs.class,
      ])
    "
  >
    <slot />
  </div>
</template>
