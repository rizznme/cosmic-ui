<script setup lang="ts">
import { computed, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as paginationMachine from "@zag-js/pagination";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { twMerge } from "tailwind-merge";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<paginationMachine.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(paginationMachine.machine, machineProps);
const api = computed(() => paginationMachine.connect(service, normalizeProps));
</script>

<template>
  <div v-bind="api.getRootProps()" :class="twMerge(['flex items-center gap-1.5', rawAttrs.class])">
    <button
      v-bind="api.getPrevTriggerProps()"
      class="size-8 flex items-center justify-center border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
    >
      <ChevronLeft class="size-4" />
    </button>
    <template v-for="(page, i) in api.pages" :key="i">
      <button
        v-if="page.type === 'page'"
        v-bind="api.getItemProps(page)"
        class="size-8 border border-primary/30 hover:bg-primary/10 data-[selected]:bg-primary/20 data-[selected]:border-primary"
      >
        {{ page.value }}
      </button>
      <span
        v-else
        v-bind="api.getEllipsisProps({ index: i })"
        class="size-8 flex items-center justify-center"
      >
        &#8230;
      </span>
    </template>
    <button
      v-bind="api.getNextTriggerProps()"
      class="size-8 flex items-center justify-center border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
    >
      <ChevronRight class="size-4" />
    </button>
  </div>
</template>
