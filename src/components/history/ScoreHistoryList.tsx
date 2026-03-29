import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../data/selectors/PlayerSelectors";
import { selectScoreHistoryEntriesForPlayer } from "../../data/selectors/HistorySelectors";
import type { RootState } from "../../data/store/Store";
import type { PlayerId } from "../../types/PlayerId";
import { formatScore } from "../../utils/scores/formatScore";
import { formatHistoryTimestamp } from "../../utils/history/formatHistoryTimestamp";
import styles from "./ScoreHistoryList.module.scss";

interface ScoreHistoryListProps {
  playerId?: PlayerId;
}

function ScoreHistoryList({ playerId }: ScoreHistoryListProps) {
  const historyEntries = useSelector((state: RootState) =>
    selectScoreHistoryEntriesForPlayer(state, playerId),
  );
  const players = useSelector(selectPlayers);

  const playerNameById = new Map(
    players.map((player) => [player.id, player.name] as const),
  );

  if (historyEntries.length === 0) {
    return (
      <Card withBorder className={styles.historyCard}>
        <Text c="dimmed">No history yet.</Text>
      </Card>
    );
  }

  return (
    <Stack className={styles.historyList} gap="sm">
      {historyEntries.map((entry) => {
        const playerName =
          playerNameById.get(entry.playerId) ?? "Unknown player";
        const scoreAfter = entry.scoreBefore + entry.scoreChange;
        const scoreDeltaLabel =
          entry.scoreChange > 0
            ? `+${formatScore(entry.scoreChange)}`
            : formatScore(entry.scoreChange);

        return (
          <motion.div
            key={`${entry.playerId}-${entry.timestamp}-${entry.scoreChange}`}
            layout
          >
            <Card withBorder className={styles.historyCard}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Stack gap={2}>
                  <Text className={styles.playerName} fw={700}>
                    {playerName}
                  </Text>
                  <Text className={styles.timestamp} c="dimmed">
                    {formatHistoryTimestamp(entry.timestamp)}
                  </Text>
                  <Text className={styles.scoreLine}>
                    {formatScore(entry.scoreBefore)} → {formatScore(scoreAfter)}
                  </Text>
                </Stack>
                <Box
                  className={[
                    styles.scoreDeltaBadge,
                    entry.scoreChange >= 0
                      ? styles.scoreDeltaPositive
                      : styles.scoreDeltaNegative,
                  ].join(" ")}
                >
                  <Text className={styles.scoreDeltaValue}>
                    {scoreDeltaLabel}
                  </Text>
                </Box>
              </Group>
            </Card>
          </motion.div>
        );
      })}
    </Stack>
  );
}

export default ScoreHistoryList;
