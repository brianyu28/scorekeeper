import { Button, SimpleGrid, Stack } from "@mantine/core";
import { NumberPadKey } from "../../types/NumberPadKey";

interface Props {
  onKeyPress: (key: NumberPadKey) => void;
}

const KEYS: Array<Array<{ key: NumberPadKey; label: string }>> = [
  [
    { key: NumberPadKey.ONE, label: "1" },
    { key: NumberPadKey.TWO, label: "2" },
    { key: NumberPadKey.THREE, label: "3" },
  ],
  [
    { key: NumberPadKey.FOUR, label: "4" },
    { key: NumberPadKey.FIVE, label: "5" },
    { key: NumberPadKey.SIX, label: "6" },
  ],
  [
    { key: NumberPadKey.SEVEN, label: "7" },
    { key: NumberPadKey.EIGHT, label: "8" },
    { key: NumberPadKey.NINE, label: "9" },
  ],
  [
    { key: NumberPadKey.NEGATE, label: "−" },
    { key: NumberPadKey.ZERO, label: "0" },
    { key: NumberPadKey.BACKSPACE, label: "⌫" },
  ],
];

function NumberPad({ onKeyPress }: Props) {
  return (
    <Stack gap="sm">
      <SimpleGrid cols={3} spacing="sm">
        {KEYS.flat().map(({ key, label }) => (
          <Button
            key={key}
            size="lg"
            variant="light"
            onClick={() => onKeyPress(key)}
          >
            {label}
          </Button>
        ))}
      </SimpleGrid>
      <Button
        size="sm"
        color="gray"
        variant="subtle"
        onClick={() => onKeyPress(NumberPadKey.CLEAR)}
      >
        Clear
      </Button>
    </Stack>
  );
}

export default NumberPad;
