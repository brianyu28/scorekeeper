import { Box, Card, Group, Stack, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectAreAllPlayerScoresZero } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import type { PlayerWithPlace } from "../../types/PlayerWithPlace";
import AnimatedScore from "../common/AnimatedScore";
import PlayerPlaceIndicator from "./PlayerPlaceIndicator";
import styles from "./PlayerScoreCard.module.scss";

interface PlayerScoreCardProps {
  player: PlayerWithPlace;
}

function PlayerScoreCard({ player }: PlayerScoreCardProps) {
  const dispatch = useDispatch();
  const areAllPlayerScoresZero = useSelector(selectAreAllPlayerScoresZero);

  return (
    <button
      type="button"
      className={styles.playerButton}
      onClick={() => {
        dispatch(ScorekeeperActions.ShowPlayerPage(player.id));
      }}
    >
      <Card withBorder className={styles.playerCard}>
        <Group justify="space-between" wrap="nowrap" align="center">
          <Stack gap={4}>
            <Text className={styles.playerName} size="xl" fw={700}>
              {player.name}
            </Text>
            {!areAllPlayerScoresZero ? (
              <PlayerPlaceIndicator
                isTied={player.isTied}
                place={player.place}
              />
            ) : null}
          </Stack>
          <Box className={styles.scoreBadge}>
            <Text className={styles.scoreValue}>
              <AnimatedScore value={player.score} />
            </Text>
          </Box>
        </Group>
      </Card>
    </button>
  );
}

export default PlayerScoreCard;
