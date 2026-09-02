<script lang="ts">
function getColor(name: string, opacity = 1) {
  const color = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (opacity < 1) {
    return `color-mix(in oklch, ${color} ${opacity * 100}%, transparent ${
      100 - opacity * 100
    }%)`;
  }
  return color;
}

export { getColor };
</script>

<script setup lang="ts">
import { computed, ref, onMounted, useAttrs } from "vue";
import ChartJs from "chart.js/auto";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  class?: string;
  config: ConstructorParameters<typeof ChartJs>[1];
}>();

const canvasRef = ref<(HTMLCanvasElement & { instance?: unknown }) | null>(null);

onMounted(() => {
  if (canvasRef.value && !canvasRef.value.instance) {
    canvasRef.value.instance = new ChartJs(canvasRef.value, props.config);
  }
});

const attrs = useAttrs();
// Astro hands an island's root component an incidental `slot` prop when it's
// placed inside a named <slot> (e.g. `slot="preview"`); forwarding it onto
// the real root disagrees between SSR and hydration and Vue flags it as a
// mismatch. Every other attr still needs through.
const forwardedAttrs = computed(() => {
  const { slot: _slot, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="forwardedAttrs" :class="twMerge('relative h-full w-full', props.class)">
    <canvas ref="canvasRef" />
  </div>
</template>
