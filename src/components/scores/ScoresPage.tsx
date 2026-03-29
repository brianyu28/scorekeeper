import { Group, Stack, Title } from "@mantine/core";
import { Reorder } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersForScoresView } from "../../data/selectors/PlayerSelectors";
import { selectScoresViewMode } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { ScoresViewMode } from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";
import PlayerScoreCard from "./PlayerScoreCard";
import ResetPlayersModal from "./ResetPlayersModal";
import ResetScoresModal from "./ResetScoresModal";
import styles from "./ScoresPage.module.scss";
import ScoresPageMenu from "./ScoresPageMenu";
import ScoresViewToggle from "./ScoresViewToggle";

function ScoresPage() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersForScoresView);
  const viewMode = useSelector(selectScoresViewMode);
  const [isResetPlayersModalOpen, setIsResetPlayersModalOpen] = useState(false);
  const [isResetScoresModalOpen, setIsResetScoresModalOpen] = useState(false);

  const playerIds = players.map((player) => player.id);
  const isCustomOrder = viewMode === ScoresViewMode.CUSTOM;

  const handleReorder = (order: PlayerId[]) => {
    if (!isCustomOrder) {
      return;
    }

    dispatch(ScorekeeperActions.SetPlayerOrder(order));
  };

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={2}>Scores</Title>
        <ScoresPageMenu
          onResetPlayers={() => setIsResetPlayersModalOpen(true)}
          onResetScores={() => setIsResetScoresModalOpen(true)}
        />
      </Group>
      <ScoresViewToggle />
      <Reorder.Group
        as="div"
        axis="y"
        className={styles.playerList}
        values={playerIds}
        onReorder={handleReorder}
      >
        {players.map((player) => (
          <PlayerScoreCard
            key={player.id}
            player={player}
            dragEnabled={isCustomOrder}
          />
        ))}
      </Reorder.Group>
      <ResetScoresModal
        opened={isResetScoresModalOpen}
        onClose={() => setIsResetScoresModalOpen(false)}
      />
      <ResetPlayersModal
        opened={isResetPlayersModalOpen}
        onClose={() => setIsResetPlayersModalOpen(false)}
      />
    </Stack>
  );
}

export default ScoresPage;
