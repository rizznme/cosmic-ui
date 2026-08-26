import type { InjectionKey, ComputedRef } from "vue";
import type * as toast from "@zag-js/toast";

type ToastApi = ComputedRef<ReturnType<typeof toast.connect>>;

const ToastApiKey: InjectionKey<ToastApi> = Symbol("toast-api");

export { ToastApiKey };
export type { ToastApi };
