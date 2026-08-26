import type { InjectionKey, Ref } from "vue";

const AlertPresentKey: InjectionKey<Ref<boolean>> = Symbol("alert-present");

export { AlertPresentKey };
