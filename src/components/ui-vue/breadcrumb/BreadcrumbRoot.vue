<script setup lang="ts">
// Astro forwards a `slot="preview"` used to route this island into a named
// slot as a genuine prop on whatever Vue renders at the top of that island.
// Without opting out of attribute inheritance, Vue falls that unrecognized
// prop through onto this root DOM node - and SSR and the client hydration
// script disagree on whether to do that, so it becomes a hydration mismatch
// on every page that mounts this component directly (as every demo does).
defineOptions({ inheritAttrs: false });
defineProps<{ class?: string }>();
</script>

<template>
  <nav aria-label="breadcrumb" :class="$props.class">
    <slot />
  </nav>
</template>
