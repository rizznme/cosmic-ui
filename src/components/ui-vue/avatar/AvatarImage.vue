<script setup lang="ts">
import { inject } from "vue";
import { twMerge } from "tailwind-merge";
import { AvatarApiKey } from "./context";

const { src, alt, class: className } = defineProps<{
  src: string;
  alt: string;
  class?: string;
}>();

const injectedApi = inject(AvatarApiKey);
if (!injectedApi) throw new Error("Avatar parts must be used within <AvatarRoot>");
const api = injectedApi;
</script>

<template>
  <img
    v-bind="api.getImageProps()"
    :src="src"
    :alt="alt"
    :class="twMerge(['size-full object-cover', className])"
  />
</template>
