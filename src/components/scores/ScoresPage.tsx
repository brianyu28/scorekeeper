import { Group, Stack, Title } from "@mantine/core";
import { Reorder } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersForScoresView } from "../../data/selectors/PlayerSelectors";
import { selectScoresViewMode } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { ScoresViewMode } from "../../types/Page";
import PlayerScoreCard from "./PlayerScoreCard";
import ResetGameModal from "./ResetGameModal";
import styles from "./ScoresPage.module.scss";
import ScoresPageMenu from "./ScoresPageMenu";
import ScoresViewToggle from "./ScoresViewToggle";

function ScoresPage() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersForScoresView);
  const viewMode = useSelector(selectScoresViewMode);
  const [resetModalOpened, setResetModalOpened] = useState(false);
  const playerIds = players.map((player) => player.id);
  const isUnordered = viewMode === ScoresViewMode.UNORDERED;

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={2}>Scores</Title>
        <ScoresPageMenu onResetGame={() => setResetModalOpened(true)} />
      </Group>
      <ScoresViewToggle />
      <Reorder.Group
        as="div"
        axis="y"
        className={styles.playerList}
        values={playerIds}
        onReorder={(nextOrder) => {
          if (!isUnordered) {
            return;
          }

          dispatch(ScorekeeperActions.SetPlayerOrder(nextOrder));
        }}
      >
        {players.map((player) => (
          <PlayerScoreCard
            key={player.id}
            player={player}
            dragEnabled={isUnordered}
          />
        ))}
      </Reorder.Group>
      <ResetGameModal
        opened={resetModalOpened}
        onClose={() => setResetModalOpened(false)}
      />
    </Stack>
  );
}

export default ScoresPage;
