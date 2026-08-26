import type { InjectionKey, ComputedRef } from "vue";
import type * as radioGroup from "@zag-js/radio-group";

type RadioGroupApi = ComputedRef<ReturnType<typeof radioGroup.connect>>;

const RadioGroupApiKey: InjectionKey<RadioGroupApi> = Symbol("radio-group-api");
const RadioGroupItemValueKey: InjectionKey<string> = Symbol("radio-group-item-value");

export { RadioGroupApiKey, RadioGroupItemValueKey };
export type { RadioGroupApi };
