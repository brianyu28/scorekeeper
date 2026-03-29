import { Card, CloseButton, Group, Stack, Text } from "@mantine/core";
import { Reorder, useDragControls } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayers } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import type { PlayerId } from "../../types/PlayerId";
import styles from "./ConfiguredPlayerList.module.scss";

interface PlayerRowProps {
  player: { id: PlayerId; name: string };
}

function PlayerRow({ player }: PlayerRowProps) {
  const dispatch = useDispatch();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={player.id}
      as="div"
      className={styles.playerItem}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
    >
      <Card withBorder className={styles.playerCard}>
        <Group justify="space-between" wrap="nowrap" align="center">
          <button
            type="button"
            className={styles.dragHandle}
            aria-label={`Reorder ${player.name}`}
            onPointerDown={(event) => {
              dragControls.start(event);
            }}
          >
            <span className={styles.dragHandleBars} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <Text className={styles.playerName}>{player.name}</Text>
          <CloseButton
            variant="subtle"
            c="red"
            className={styles.removeButton}
            aria-label={`Remove ${player.name}`}
            onClick={() => dispatch(ScorekeeperActions.RemovePlayer(player.id))}
          />
        </Group>
      </Card>
    </Reorder.Item>
  );
}

function ConfiguredPlayerList() {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);
  const playerIds = players.map((player) => player.id);

  const handleReorder = (orderedPlayerIds: PlayerId[]) => {
    dispatch(ScorekeeperActions.SetPlayerOrder(orderedPlayerIds));
  };

  return (
    <Stack gap={6}>
      <Reorder.Group
        as="div"
        axis="y"
        className={styles.playerList}
        values={playerIds}
        onReorder={handleReorder}
      >
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </Reorder.Group>
    </Stack>
  );
}

export default ConfiguredPlayerList;
