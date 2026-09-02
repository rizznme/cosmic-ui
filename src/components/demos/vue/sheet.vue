<script setup lang="ts">
import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetCloseTrigger,
} from "@/components/ui-vue/sheet";
import { PanelRight } from "@lucide/vue";
</script>

<template>
  <SheetRoot>
    <SheetTrigger>
      <PanelRight class="size-4 me-2.5" /> Open Sheet
    </SheetTrigger>
    <SheetContent>
      <SheetCloseTrigger />
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetContent>
  </SheetRoot>
</template>
