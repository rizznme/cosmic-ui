<script setup lang="ts">
import { computed, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as toast from "@zag-js/toast";
import Portal from "@/components/ui-vue/portal.vue";
import ToastActor from "./ToastActor.vue";

// `defineProps()`'s runtime declaration form still trips Vue's automatic
// type-declaration generation if the prop is cast to a complex external type
// (`Object as () => toast.Store`) right there in the macro call. Keeping the
// prop untyped here and casting it as a normal TS expression below avoids it.
const props = defineProps({
  toaster: { type: Object, required: true },
});
const toaster = props.toaster as toast.Store;
const id = useId();

const service = useMachine(
  toast.group.machine,
  computed(() => ({ id, store: toaster }))
);
const api = computed(() => toast.group.connect(service, normalizeProps));
</script>

<template>
  <Portal>
    <div v-bind="api.getGroupProps()">
      <ToastActor
        v-for="(item, index) in api.getToasts()"
        :key="item.id"
        :value="item"
        :parent="service"
        :index="index"
      >
        <template #default="{ toast: toastValue }">
          <slot :toast="toastValue" />
        </template>
      </ToastActor>
    </div>
  </Portal>
</template>
