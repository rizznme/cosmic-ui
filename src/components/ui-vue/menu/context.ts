import type { InjectionKey, ComputedRef } from "vue";
import type * as menu from "@zag-js/menu";

type MenuApi = ComputedRef<ReturnType<typeof menu.connect>>;

const MenuApiKey: InjectionKey<MenuApi> = Symbol("menu-api");

export { MenuApiKey };
export type { MenuApi };
