import type { InjectionKey, ComputedRef } from "vue";
import type * as tabs from "@zag-js/tabs";

type TabsApi = ComputedRef<ReturnType<typeof tabs.connect>>;

const TabsApiKey: InjectionKey<TabsApi> = Symbol("tabs-api");

export { TabsApiKey };
export type { TabsApi };
