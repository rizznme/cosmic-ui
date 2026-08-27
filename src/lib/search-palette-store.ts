type Listener = () => void;

let open = false;
const listeners = new Set<Listener>();

export function getSearchOpen() {
  return open;
}

export function setSearchOpen(value: boolean) {
  open = value;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
