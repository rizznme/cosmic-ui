<script setup lang="ts">
import Chart, { getColor } from "@/components/ui-vue/chart.vue";

const config = {
  type: "bar" as const,
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Html Template",
        maxBarThickness: 12,
        data: [60, 150, 30, 200, 180, 50, 180, 120, 230, 180, 250, 270],
        backgroundColor: () => getColor("--color-primary", 0.3),
        borderColor: () => getColor("--color-primary"),
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <Chart class="max-w-100" :config="config" />
</template>
