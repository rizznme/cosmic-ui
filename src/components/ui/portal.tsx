import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

/**
 * Renders children into document.body on the client, and inline on the server.
 *
 * The server check matters: Astro server-renders islands, and `createPortal`
 * needs a real `document`.
 */
function Portal({ children }: React.PropsWithChildren) {
  const isServer = useSyncExternalStore(
    subscribe,
    () => false,
    () => true
  );

  if (isServer) return <>{children}</>;

  return createPortal(children, document.body);
}

export { Portal };
