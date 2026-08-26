import type { InjectionKey, ComputedRef } from "vue";
import type * as dialog from "@zag-js/dialog";

type DialogApi = ComputedRef<ReturnType<typeof dialog.connect>>;

const DialogApiKey: InjectionKey<DialogApi> = Symbol("dialog-api");

export { DialogApiKey };
export type { DialogApi };
