<script setup lang="ts">
import { AlertRoot, AlertTitle, AlertDescription, AlertCloseTrigger } from "@/components/ui-vue/alert";
import { SquareCheck } from "@lucide/vue";
</script>

<template>
  <AlertRoot>
    <AlertTitle>
      <SquareCheck class="flex-none size-4.5 me-2.5" /> Success! Your
      changes have been saved
    </AlertTitle>
    <AlertDescription>
      This is an alert with icon, title and description.
    </AlertDescription>
    <AlertCloseTrigger />
  </AlertRoot>
</template>
