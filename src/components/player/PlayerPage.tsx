import { Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerById } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import type { RootState } from "../../data/store/Store";
import { NumberPadKey } from "../../types/NumberPadKey";
import type { PlayerId } from "../../types/PlayerId";
import { formatScore } from "../../utils/scores/formatScore";
import { getNumberPadKeyForKey } from "../../utils/ui/getNumberPadKeyForKey";
import NumberPad from "../common/NumberPad";
import PlayerPageMenu from "./PlayerPageMenu";

interface Props {
  playerId: PlayerId;
}

function PlayerPage({ playerId }: Props) {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) =>
    selectPlayerById(state, playerId),
  );

  const [absoluteScoreDelta, setAbsoluteScoreDelta] = useState(0);
  const [isNegated, setIsNegated] = useState(false);

  const updateScore = useCallback(() => {
    const scoreDelta = isNegated ? -absoluteScoreDelta : absoluteScoreDelta;

    dispatch(ScorekeeperActions.UpdatePlayerScore({ playerId, scoreDelta }));
    dispatch(ScorekeeperActions.ShowScoresPage());
  }, [absoluteScoreDelta, dispatch, isNegated, playerId]);

  const handleKeyPress = useCallback(
    (key: NumberPadKey) => {
      switch (key) {
        case NumberPadKey.CLEAR:
          setAbsoluteScoreDelta(0);
          setIsNegated(false);
          return;
        case NumberPadKey.BACKSPACE:
          if (absoluteScoreDelta === 0) {
            setIsNegated(false);
          }
          setAbsoluteScoreDelta((currentValue) =>
            Math.floor(currentValue / 10),
          );
          return;
        case NumberPadKey.NEGATE:
          setIsNegated((currentValue) => !currentValue);
          return;
        default:
          if (/^[0-9]$/.test(key)) {
            const digit = Number(key);

            setAbsoluteScoreDelta((currentValue) => currentValue * 10 + digit);
          }
      }
    },
    [absoluteScoreDelta],
  );

  useEffect(() => {
    const handleKeyboardInput = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        dispatch(ScorekeeperActions.ShowScoresPage());
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        updateScore();
        return;
      }

      const key = getNumberPadKeyForKey(event);
      if (key === undefined) {
        return;
      }

      event.preventDefault();

      handleKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [updateScore, dispatch, handleKeyPress]);

  if (player === undefined) {
    return (
      <Stack>
        <Title order={2}>Player not found</Title>
        <Button onClick={() => dispatch(ScorekeeperActions.ShowScoresPage())}>
          Back to scores
        </Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={2}>{player.name}</Title>
        <PlayerPageMenu playerId={playerId} />
      </Group>
      <Card withBorder>
        <Stack gap="xs">
          <Text size="sm" c="dimmed">
            Current score
          </Text>
          <Title order={1}>{formatScore(player.score)}</Title>
        </Stack>
      </Card>

      <Card withBorder>
        <Stack>
          <Text size="sm" c="dimmed">
            Change score by
          </Text>
          <Title order={1}>
            {isNegated && "-"}
            {formatScore(absoluteScoreDelta)}
          </Title>
          <NumberPad onKeyPress={handleKeyPress} />
          <Group grow>
            <Button
              variant="outline"
              color="gray"
              onClick={() => dispatch(ScorekeeperActions.ShowScoresPage())}
            >
              Cancel
            </Button>
            <Button onClick={updateScore}>
              {isNegated ? "-" : "+"}
              {formatScore(absoluteScoreDelta)}
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}

export default PlayerPage;
