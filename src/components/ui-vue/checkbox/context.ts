import type { InjectionKey, ComputedRef } from "vue";
import type * as checkbox from "@zag-js/checkbox";

type CheckboxApi = ComputedRef<ReturnType<typeof checkbox.connect>>;

const CheckboxApiKey: InjectionKey<CheckboxApi> = Symbol("checkbox-api");

export { CheckboxApiKey };
export type { CheckboxApi };
