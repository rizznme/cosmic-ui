import type { InjectionKey, ComputedRef } from "vue";
import type * as dialogMachine from "@zag-js/dialog";

type AlertDialogApi = ComputedRef<ReturnType<typeof dialogMachine.connect>>;

const AlertDialogApiKey: InjectionKey<AlertDialogApi> = Symbol("alert-dialog-api");

export { AlertDialogApiKey };
export type { AlertDialogApi };
