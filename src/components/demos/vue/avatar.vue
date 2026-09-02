<script setup lang="ts">
import { AvatarRoot, AvatarImage, AvatarFallback } from "@/components/ui-vue/avatar";
</script>

<template>
  <AvatarRoot>
    <AvatarImage src="https://i.pravatar.cc/150?u=cosmic-ui" alt="User avatar" />
    <AvatarFallback>CU</AvatarFallback>
  </AvatarRoot>
</template>
