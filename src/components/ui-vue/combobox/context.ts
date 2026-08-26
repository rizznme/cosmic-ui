import type { InjectionKey, ComputedRef } from "vue";
import type * as combobox from "@zag-js/combobox";

type ComboboxApi = ComputedRef<ReturnType<typeof combobox.connect>>;

const ComboboxApiKey: InjectionKey<ComboboxApi> = Symbol("combobox-api");
const ComboboxItemKey: InjectionKey<combobox.CollectionItem> = Symbol("combobox-item");

export { ComboboxApiKey, ComboboxItemKey };
export type { ComboboxApi };
