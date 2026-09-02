<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import Portal from "@/components/ui-vue/portal.vue";
import { DatePickerApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(DatePickerApiKey);
if (!injectedApi) throw new Error("DatePicker parts must be used within <DatePickerRoot>");
const api = injectedApi;
</script>

<template>
  <Portal>
    <div
      v-bind="api.getPositionerProps()"
      :style="{ ...api.getPositionerProps().style, zIndex: 70 }"
    >
      <div
        v-bind="api.getContentProps()"
        :class="twMerge(['border border-primary/30 bg-background outline-none', className])"
      >
        <slot />
      </div>
    </div>
  </Portal>
</template>
