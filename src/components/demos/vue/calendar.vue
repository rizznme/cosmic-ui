<script setup lang="ts">
import { DatePickerRoot, DatePickerCalendar } from "@/components/ui-vue/date-picker";
</script>

<template>
  <DatePickerRoot :inline="true">
    <DatePickerCalendar />
  </DatePickerRoot>
</template>
