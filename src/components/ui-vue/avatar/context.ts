import type { InjectionKey, ComputedRef } from "vue";
import type * as avatarMachine from "@zag-js/avatar";

type AvatarApi = ComputedRef<ReturnType<typeof avatarMachine.connect>>;

const AvatarApiKey: InjectionKey<AvatarApi> = Symbol("avatar-api");

export { AvatarApiKey };
export type { AvatarApi };
