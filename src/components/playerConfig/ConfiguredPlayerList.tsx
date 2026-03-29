import { Card, CloseButton, Group, Stack, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayersInManualOrder } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import styles from "./ConfiguredPlayerList.module.scss";

function ConfiguredPlayerList() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersInManualOrder);

  return (
    <Stack gap={6}>
      {players.map((player) => (
        <Card key={player.id} withBorder className={styles.playerCard}>
          <Group justify="space-between" wrap="nowrap">
            <Text fw={600}>{player.name}</Text>
            <CloseButton
              variant="subtle"
              c="red"
              className={styles.removeButton}
              aria-label={`Remove ${player.name}`}
              onClick={() =>
                dispatch(ScorekeeperActions.RemovePlayer(player.id))
              }
            ></CloseButton>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}

export default ConfiguredPlayerList;
