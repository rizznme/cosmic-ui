import type { InjectionKey, ComputedRef } from "vue";
import type * as accordion from "@zag-js/accordion";

type AccordionApi = ComputedRef<ReturnType<typeof accordion.connect>>;

const AccordionApiKey: InjectionKey<AccordionApi> = Symbol("accordion-api");
const AccordionItemValueKey: InjectionKey<string> = Symbol("accordion-item-value");

export { AccordionApiKey, AccordionItemValueKey };
export type { AccordionApi };
