import { Button, Group, Stack, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentHistoryPlayerId,
  selectHistoryBackPage,
} from "../../data/selectors/UiSelectors";
import { selectPlayerById } from "../../data/selectors/PlayerSelectors";
import type { RootState } from "../../data/store/Store";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { PageType } from "../../types/Page";
import styles from "./HistoryPage.module.scss";
import ScoreHistoryList from "./ScoreHistoryList";

function HistoryPage() {
  const dispatch = useDispatch();
  const playerId = useSelector(selectCurrentHistoryPlayerId);
  const backPage = useSelector(selectHistoryBackPage);
  const player = useSelector((state: RootState) =>
    playerId === undefined ? undefined : selectPlayerById(state, playerId),
  );

  const title =
    playerId === undefined
      ? "Game history"
      : player?.name !== undefined
        ? `${player.name}'s history`
        : "Player history";

  const backLabel =
    backPage?.pageType === PageType.PLAYER
      ? "Back to player"
      : "Back to scores";

  return (
    <Stack>
      <Group
        className={styles.pageHeader}
        justify="space-between"
        wrap="nowrap"
      >
        <Title order={2}>{title}</Title>
        <Button
          className={styles.backButton}
          variant="light"
          onClick={() => dispatch(ScorekeeperActions.ShowPreviousPage())}
        >
          {backLabel}
        </Button>
      </Group>
      <ScoreHistoryList playerId={playerId} />
    </Stack>
  );
}

export default HistoryPage;
