<script setup lang="ts">
import {
  NumberInputRoot,
  NumberInputLabel,
  NumberInputControl,
} from "@/components/ui-vue/number-input";
</script>

<template>
  <NumberInputRoot defaultValue="1" :min="0" :max="10">
    <NumberInputLabel>Quantity</NumberInputLabel>
    <NumberInputControl />
  </NumberInputRoot>
</template>
