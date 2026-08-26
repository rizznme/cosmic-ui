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
import { ref, onMounted } from "vue";
import ChartJs from "chart.js/auto";
import { twMerge } from "tailwind-merge";

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
</script>

<template>
  <div :class="twMerge('relative h-64 w-full', props.class)">
    <canvas ref="canvasRef" />
  </div>
</template>
