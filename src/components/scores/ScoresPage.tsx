import { Group, Stack, Title } from "@mantine/core";
import { motion } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPlayersForScoresView } from "../../data/selectors/PlayerSelectors";
import PlayerScoreCard from "./PlayerScoreCard";
import ResetPlayersModal from "./ResetPlayersModal";
import ResetScoresModal from "./ResetScoresModal";
import styles from "./ScoresPage.module.scss";
import ScoresPageMenu from "./ScoresPageMenu";
import ScoresViewToggle from "./ScoresViewToggle";

function ScoresPage() {
  const players = useSelector(selectPlayersForScoresView);
  const [isResetPlayersModalOpen, setIsResetPlayersModalOpen] = useState(false);
  const [isResetScoresModalOpen, setIsResetScoresModalOpen] = useState(false);

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
