import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as avatarMachine from "@zag-js/avatar";

const AvatarContext = createContext<ReturnType<typeof avatarMachine.connect> | null>(
  null
);

function useAvatarContext() {
  const api = useContext(AvatarContext);
  if (!api) throw new Error("Avatar parts must be used within <AvatarRoot>");
  return api;
}

function AvatarRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Partial<avatarMachine.Props> & { className?: string }>) {
  const service = useMachine(avatarMachine.machine, { id: useId(), ...rest });
  const api = avatarMachine.connect(service, normalizeProps);

  return (
    <AvatarContext.Provider value={api}>
      <span
        {...api.getRootProps()}
        className={twMerge([
          "relative inline-flex size-10 items-center justify-center overflow-hidden border border-primary/30 bg-primary/10",
          className,
        ])}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const api = useAvatarContext();

  return (
    <img
      {...api.getImageProps()}
      src={src}
      alt={alt}
      className={twMerge(["size-full object-cover", className])}
    />
  );
}

function AvatarFallback({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAvatarContext();

  return (
    <span
      {...api.getFallbackProps()}
      className={twMerge(["text-sm font-medium", className])}
    >
      {children}
    </span>
  );
}

export { AvatarRoot, AvatarImage, AvatarFallback };
