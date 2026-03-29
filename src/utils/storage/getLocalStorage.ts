export function getLocalStorage(): Storage | undefined {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return undefined;
  }

  return globalThis.localStorage;
}
