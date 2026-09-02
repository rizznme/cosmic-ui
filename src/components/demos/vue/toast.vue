<script setup lang="ts">
import Button from "@/components/ui-vue/button.vue";
import { Rocket } from "@lucide/vue";
import {
  createToaster,
  Toaster,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastCloseTrigger,
} from "@/components/ui-vue/toast";

// This template has two root nodes (Button + Toaster), so Vue can't
// automatically inherit attrs onto either one - Astro's incidental `slot`
// prop (from being placed in a named <slot>) then trips a dev-only
// "extraneous non-props attributes" warning with nowhere to land it. There's
// nothing to forward either way, so just opt out of the attempt.
defineOptions({ inheritAttrs: false });

const toaster = createToaster({
  overlap: true,
  placement: "bottom-end",
  offsets: "1.6rem",
  max: 3,
});

function launch() {
  toaster.create({
    title: "Success! Event has been created!",
    description: "This is a toast with title and description.",
    duration: 100000000,
  });
}
</script>

<template>
  <Button class="min-w-30" type="submit" @click="launch">
    <Rocket class="size-4 me-2.5" />
    Launch Project
  </Button>
  <Toaster :toaster="toaster">
    <template #default="{ toast }">
      <ToastRoot :key="toast.id">
        <ToastTitle>{{ toast.title }}</ToastTitle>
        <ToastDescription>{{ toast.description }}</ToastDescription>
        <ToastCloseTrigger />
      </ToastRoot>
    </template>
  </Toaster>
</template>
