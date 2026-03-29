import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { Reorder } from "motion/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import type { PlayerWithPlace } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { formatScore } from "../../utils/scores/formatScore";
import { getOrdinalSuffix } from "../../utils/scores/getOrdinalSuffix";
import styles from "./ScoresPage.module.scss";

interface PlayerScoreCardProps {
  player: PlayerWithPlace;
  dragEnabled: boolean;
}

function PlayerScoreCard({ player, dragEnabled }: PlayerScoreCardProps) {
  const dispatch = useDispatch();
  const dragGestureInProgress = useRef(false);

  return (
    <Reorder.Item
      key={player.id}
      value={player.id}
      as="button"
      type="button"
      className={styles.playerButton}
      drag={dragEnabled ? "y" : false}
      onDrag={() => {
        dragGestureInProgress.current = true;
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          dragGestureInProgress.current = false;
        }, 0);
      }}
      onClick={(event) => {
        // Don't trigger the click action if the user is currently dragging the card
        if (dragGestureInProgress.current) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        dispatch(ScorekeeperActions.ShowPlayerPage(player.id));
      }}
    >
      <Card withBorder className={styles.playerCard}>
        <Group justify="space-between" wrap="nowrap" align="center">
          <Stack gap={4}>
            <Text fw={700}>{player.name}</Text>
            <Text c="dimmed">
              Place: {player.place}
              {getOrdinalSuffix(player.place)}
              {player.isTied ? " (tie)" : ""}
            </Text>
          </Stack>
          <Box className={styles.scoreBadge}>
            <Text className={styles.scoreValue}>
              {formatScore(player.score)}
            </Text>
          </Box>
        </Group>
      </Card>
    </Reorder.Item>
  );
}

export default PlayerScoreCard;
