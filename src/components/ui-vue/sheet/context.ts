import type { InjectionKey, ComputedRef } from "vue";
import type * as dialogMachine from "@zag-js/dialog";

type SheetApi = ComputedRef<ReturnType<typeof dialogMachine.connect>>;

const SheetApiKey: InjectionKey<SheetApi> = Symbol("sheet-api");

export { SheetApiKey };
export type { SheetApi };
