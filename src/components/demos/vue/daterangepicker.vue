<script setup lang="ts">
import {
  DatePickerRoot,
  DatePickerControl,
  DatePickerContent,
  DatePickerCalendar,
} from "@/components/ui-vue/date-picker";
</script>

<template>
  <DatePickerRoot selectionMode="range">
    <DatePickerControl />
    <DatePickerContent>
      <DatePickerCalendar />
    </DatePickerContent>
  </DatePickerRoot>
</template>
