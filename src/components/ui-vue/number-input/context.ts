import type { InjectionKey, ComputedRef } from "vue";
import type * as numberInputMachine from "@zag-js/number-input";

type NumberInputApi = ComputedRef<ReturnType<typeof numberInputMachine.connect>>;

const NumberInputApiKey: InjectionKey<NumberInputApi> = Symbol("number-input-api");

export { NumberInputApiKey };
export type { NumberInputApi };
