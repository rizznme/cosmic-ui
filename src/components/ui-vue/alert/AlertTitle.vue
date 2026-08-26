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
  <div
    v-bind="attrsWithoutClass"
    :class="
      twMerge([
        'flex items-center text-shadow-lg text-shadow-primary font-bold w-full relative',
        rawAttrs.class,
      ])
    "
  >
    <slot />
  </div>
</template>
