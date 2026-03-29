import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { Reorder } from "motion/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import type { PlayerWithPlace } from "../../types/PlayerWithPlace";
import { formatScore } from "../../utils/scores/formatScore";
import PlayerPlaceIndicator from "./PlayerPlaceIndicator";
import styles from "./PlayerScoreCard.module.scss";

interface PlayerScoreCardProps {
  player: PlayerWithPlace;
  dragEnabled: boolean;
}

function PlayerScoreCard({ player, dragEnabled }: PlayerScoreCardProps) {
  const dispatch = useDispatch();
  const isDragGestureInProgress = useRef(false);

  return (
    <Reorder.Item
      key={player.id}
      value={player.id}
      as="button"
      type="button"
      className={styles.playerButton}
      drag={dragEnabled ? "y" : false}
      onDrag={() => {
        isDragGestureInProgress.current = true;
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          isDragGestureInProgress.current = false;
        }, 0);
      }}
      onClick={(event) => {
        // Don't trigger the click action if the user is currently dragging the card
        if (isDragGestureInProgress.current) {
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
            <Text className={styles.playerName} size="xl" fw={700}>
              {player.name}
            </Text>
            <PlayerPlaceIndicator isTied={player.isTied} place={player.place} />
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
