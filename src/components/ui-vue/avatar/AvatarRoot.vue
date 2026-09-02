<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as avatarMachine from "@zag-js/avatar";
import { twMerge } from "tailwind-merge";
import { AvatarApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<avatarMachine.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(avatarMachine.machine, machineProps);
const api = computed(() => avatarMachine.connect(service, normalizeProps));

provide(AvatarApiKey, api);
</script>

<template>
  <span
    v-bind="api.getRootProps()"
    :class="
      twMerge([
        'relative inline-flex size-10 items-center justify-center overflow-hidden border border-primary/30 bg-primary/10',
        rawAttrs.class,
      ])
    "
  >
    <slot />
  </span>
</template>
