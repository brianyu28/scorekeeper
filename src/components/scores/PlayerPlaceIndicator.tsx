import { Badge, Text } from "@mantine/core";
import { getOrdinalSuffix } from "../../utils/scores/getOrdinalSuffix";

interface Props {
  isTied?: boolean;
  place: number;
}

function PlayerPlaceIndicator({ isTied = false, place }: Props) {
  const tiedText = isTied ? " (tie)" : "";
  const placeLabel = `${place}${getOrdinalSuffix(place)}${tiedText}`;
  const badgeColor = getColorForPlace(place);

  if (badgeColor !== undefined) {
    return <Badge color={badgeColor}>{placeLabel}</Badge>;
  }

  return (
    <Text c="dimmed" ta="left">
      {placeLabel}
    </Text>
  );
}

function getColorForPlace(place: number): string | undefined {
  switch (place) {
    case 1:
      return "yellow";
    case 2:
      return "gray";
    case 3:
      return "brown";
    default:
      return undefined;
  }
}

export default PlayerPlaceIndicator;
