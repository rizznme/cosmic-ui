import type { InjectionKey, ComputedRef } from "vue";
import type * as select from "@zag-js/select";

type SelectApi = ComputedRef<ReturnType<typeof select.connect>>;

const SelectApiKey: InjectionKey<SelectApi> = Symbol("select-api");
const SelectItemKey: InjectionKey<select.CollectionItem> = Symbol("select-item");

export { SelectApiKey, SelectItemKey };
export type { SelectApi };
