<script setup lang="ts">
import Pagination from "@/components/ui-vue/pagination.vue";
</script>

<template>
  <Pagination :count="100" :defaultPageSize="10" :siblingCount="1" />
</template>
