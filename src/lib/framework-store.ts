type Listener = () => void;

const STORAGE_KEY = "cosmic-ui-framework";

export type Framework = "react";

export const FRAMEWORKS: { id: Framework; label: string }[] = [
  { id: "react", label: "React" },
];

const DEFAULT_FRAMEWORK: Framework = "react";

let framework: Framework = DEFAULT_FRAMEWORK;
const listeners = new Set<Listener>();

if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (FRAMEWORKS.some((f) => f.id === stored)) {
    framework = stored as Framework;
  }
}

export function getFramework(): Framework {
  return framework;
}

export function getServerFramework(): Framework {
  return DEFAULT_FRAMEWORK;
}

export function setFramework(value: Framework) {
  framework = value;
  window.localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
