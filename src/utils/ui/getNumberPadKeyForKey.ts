import { NumberPadKey } from "../../types/NumberPadKey";

export function getNumberPadKeyForKey(
  event: KeyboardEvent,
): NumberPadKey | undefined {
  if (/^[0-9]$/.test(event.key)) {
    return event.key as NumberPadKey;
  }

  switch (event.key) {
    case "Enter":
      return undefined;
    case "-":
    case "_":
      return NumberPadKey.NEGATE;
    case "Backspace":
      return NumberPadKey.BACKSPACE;
    default:
      return undefined;
  }
}
