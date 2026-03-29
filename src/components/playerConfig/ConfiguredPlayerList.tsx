import { Card, Stack } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../data/selectors/PlayerSelectors";
import styles from "./ConfiguredPlayerList.module.scss";

function ConfiguredPlayerList() {
  const players = useSelector(selectPlayers);

  return (
    <Stack>
      {players.map((player) => (
        <Card key={player.id} className={styles.playerCard}>
          {player.name}
        </Card>
      ))}
    </Stack>
  );
}

export default ConfiguredPlayerList;
