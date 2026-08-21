type Listener = () => void;

let showMenu = false;
const listeners = new Set<Listener>();

export function getShowMenu() {
  return showMenu;
}

export function setShowMenu(value: boolean) {
  showMenu = value;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
