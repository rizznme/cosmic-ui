import type { InjectionKey, ComputedRef } from "vue";
import type * as switchMachine from "@zag-js/switch";

type SwitchApi = ComputedRef<ReturnType<typeof switchMachine.connect>>;

const SwitchApiKey: InjectionKey<SwitchApi> = Symbol("switch-api");

export { SwitchApiKey };
export type { SwitchApi };
