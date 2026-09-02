import type { InjectionKey, ComputedRef } from "vue";
import type * as datePickerMachine from "@zag-js/date-picker";

type DatePickerApi = ComputedRef<ReturnType<typeof datePickerMachine.connect>>;

const DatePickerApiKey: InjectionKey<DatePickerApi> = Symbol("date-picker-api");

export { DatePickerApiKey };
export type { DatePickerApi };
