<script setup lang="ts">
import { inject } from "vue";
import { Calendar as CalendarIcon, X } from "@lucide/vue";
import { twMerge } from "tailwind-merge";
import { DatePickerApiKey } from "./context";

const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(DatePickerApiKey);
if (!injectedApi) throw new Error("DatePicker parts must be used within <DatePickerRoot>");
const api = injectedApi;
</script>

<template>
  <div
    v-bind="api.getControlProps()"
    :class="
      twMerge(['flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-2 w-fit', className])
    "
  >
    <input
      v-bind="api.getInputProps({ index: 0 })"
      placeholder="Pick a date"
      class="outline-none bg-transparent w-28"
    />
    <template v-if="api.selectionMode === 'range'">
      <span class="opacity-50">-</span>
      <input
        v-bind="api.getInputProps({ index: 1 })"
        placeholder="Pick a date"
        class="outline-none bg-transparent w-28"
      />
    </template>
    <button v-bind="api.getClearTriggerProps()" class="opacity-70 hover:opacity-100 cursor-pointer">
      <X class="size-3.5" />
    </button>
    <button v-bind="api.getTriggerProps()" class="opacity-70 hover:opacity-100 cursor-pointer">
      <CalendarIcon class="size-4" />
    </button>
  </div>
</template>
