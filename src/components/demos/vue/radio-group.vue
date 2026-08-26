<script setup lang="ts">
import {
  RadioGroupRoot,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemText,
  RadioGroupItemControl,
} from "@/components/ui-vue/radio-group";

const items = [
  { id: "apple", label: "Apples" },
  { id: "orange", label: "Oranges" },
  { id: "mango", label: "Mangoes" },
  { id: "grape", label: "Grapes" },
];
</script>

<template>
  <RadioGroupRoot defaultValue="apple">
    <RadioGroupLabel>Airplane Mode</RadioGroupLabel>
    <RadioGroupItem v-for="opt in items" :key="opt.id" :value="opt.id">
      <RadioGroupItemText>{{ opt.label }}</RadioGroupItemText>
      <RadioGroupItemControl />
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
