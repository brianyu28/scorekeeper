import { Box, Button, FloatingIndicator, Group } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectScoresViewMode } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { ScoresViewMode } from "../../types/Page";
import styles from "./ScoresViewToggle.module.scss";

function ScoresViewToggle() {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectScoresViewMode);

  const [parentElement, setParentElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [customOrderButtonElement, setCustomOrderButtonElement] =
    useState<HTMLButtonElement | null>(null);
  const [byScoreButtonElement, setByScoreButtonElement] =
    useState<HTMLButtonElement | null>(null);

  const activeButtonElement =
    viewMode === ScoresViewMode.CUSTOM
      ? customOrderButtonElement
      : byScoreButtonElement;

  return (
    <Box className={styles.viewToggle} ref={setParentElement}>
      <FloatingIndicator
        parent={parentElement}
        target={activeButtonElement}
        transitionDuration={180}
        className={styles.viewToggleIndicator}
      />
      <Group grow gap={0} className={styles.viewToggleGroup}>
        <Button
          ref={setCustomOrderButtonElement}
          className={styles.viewToggleButton}
          data-active={viewMode === ScoresViewMode.CUSTOM}
          variant="subtle"
          onClick={() =>
            dispatch(
              ScorekeeperActions.SetScoresViewMode(ScoresViewMode.CUSTOM),
            )
          }
        >
          Custom order
        </Button>
        <Button
          ref={setByScoreButtonElement}
          className={styles.viewToggleButton}
          data-active={viewMode === ScoresViewMode.BY_SCORE}
          variant="subtle"
          onClick={() =>
            dispatch(
              ScorekeeperActions.SetScoresViewMode(ScoresViewMode.BY_SCORE),
            )
          }
        >
          By score
        </Button>
      </Group>
    </Box>
  );
}

export default ScoresViewToggle;
