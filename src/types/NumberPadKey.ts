export const NumberPadKey = {
  // Digit values must be their string representation for correct parsing
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  NEGATE: "-",
  BACKSPACE: "backspace",
  CLEAR: "clear",
} as const;

export type NumberPadKey = (typeof NumberPadKey)[keyof typeof NumberPadKey];
