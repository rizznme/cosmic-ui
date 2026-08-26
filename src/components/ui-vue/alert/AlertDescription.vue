<script setup lang="ts">
import { useAttrs, computed } from "vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as { class?: string };
const attrsWithoutClass = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return rest;
});
</script>

<template>
  <div v-bind="attrsWithoutClass" :class="twMerge(['relative pt-2 opacity-80', rawAttrs.class])">
    <slot />
  </div>
</template>
