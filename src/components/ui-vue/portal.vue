<script setup lang="ts">
import { ref, onMounted } from "vue";

// Astro server-renders islands, and Teleport needs a real `document` to move
// into. Stay `disabled` (render inline) until mounted on the client, then
// teleport — mirrors the React Portal's server/client split.
const mounted = ref(false);
onMounted(() => (mounted.value = true));
</script>

<template>
  <Teleport to="body" :disabled="!mounted">
    <slot />
  </Teleport>
</template>
