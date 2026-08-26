<script setup lang="ts">
import Button from "@/components/ui-vue/button.vue";
import { CheckCircle, LoaderCircle, Trash } from "@lucide/vue";
</script>

<template>
  <div class="flex flex-col md:flex-row gap-3">
    <Button variant="destructive" shape="flat">
      <Trash class="size-4 me-2.5" /> Remove
    </Button>
    <Button variant="success">
      <CheckCircle class="size-4 me-2.5" /> Accept
    </Button>
    <Button shape="simple">
      <LoaderCircle class="animate-spin size-4 me-2.5" /> Logging in...
    </Button>
  </div>
</template>
