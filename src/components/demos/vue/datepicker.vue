<script setup lang="ts">
import {
  DatePickerRoot,
  DatePickerControl,
  DatePickerContent,
  DatePickerCalendar,
} from "@/components/ui-vue/date-picker";
</script>

<template>
  <DatePickerRoot>
    <DatePickerControl />
    <DatePickerContent>
      <DatePickerCalendar />
    </DatePickerContent>
  </DatePickerRoot>
</template>
