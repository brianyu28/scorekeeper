import { Group, Stack } from "@mantine/core";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersForScoresView } from "../../data/selectors/PlayerSelectors";
import { selectIsScoresViewSwitcherEnabled } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import PlayerScoreCard from "./PlayerScoreCard";
import ResetPlayersModal from "./ResetPlayersModal";
import ResetScoresModal from "./ResetScoresModal";
import styles from "./ScoresPage.module.scss";
import ScoresPageMenu from "./ScoresPageMenu";
import ScoresViewToggle from "./ScoresViewToggle";

function ScoresPage() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersForScoresView);
  const isScoresViewSwitcherEnabled = useSelector(
    selectIsScoresViewSwitcherEnabled,
  );
  const [isResetPlayersModalOpen, setIsResetPlayersModalOpen] = useState(false);
  const [isResetScoresModalOpen, setIsResetScoresModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyboardInput = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() !== "r") {
        return;
      }

      event.preventDefault();
      dispatch(ScorekeeperActions.ReloadPlayersFromLocalStorage());
    };

    window.addEventListener("keydown", handleKeyboardInput);

    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [dispatch]);

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <div />
        <ScoresPageMenu
          onResetPlayers={() => setIsResetPlayersModalOpen(true)}
          onResetScores={() => setIsResetScoresModalOpen(true)}
        />
      </Group>
      {isScoresViewSwitcherEnabled ? <ScoresViewToggle /> : null}
      <div className={styles.playerList}>
        {players.map((player) => (
          <motion.div key={player.id} layout>
            <PlayerScoreCard player={player} />
          </motion.div>
        ))}
      </div>
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
