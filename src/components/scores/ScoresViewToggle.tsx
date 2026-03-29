import { Box, Button, FloatingIndicator, Group } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectScoresViewMode } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { ScoresViewMode } from "../../types/Page";
import styles from "./ScoresPage.module.scss";

function ScoresViewToggle() {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectScoresViewMode);

  const [parentElement, setParentElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [unorderedButtonElement, setUnorderedButtonElement] =
    useState<HTMLButtonElement | null>(null);
  const [highButtonElement, setHighButtonElement] =
    useState<HTMLButtonElement | null>(null);
  const [lowButtonElement, setLowButtonElement] =
    useState<HTMLButtonElement | null>(null);

  const activeButtonElement =
    viewMode === ScoresViewMode.UNORDERED
      ? unorderedButtonElement
      : viewMode === ScoresViewMode.HIGH
        ? highButtonElement
        : lowButtonElement;

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
          ref={setUnorderedButtonElement}
          className={styles.viewToggleButton}
          data-active={viewMode === ScoresViewMode.UNORDERED}
          variant="subtle"
          onClick={() =>
            dispatch(
              ScorekeeperActions.SetScoresViewMode(ScoresViewMode.UNORDERED),
            )
          }
        >
          Custom order
        </Button>
        <Button
          ref={setHighButtonElement}
          className={styles.viewToggleButton}
          data-active={viewMode === ScoresViewMode.HIGH}
          variant="subtle"
          onClick={() =>
            dispatch(ScorekeeperActions.SetScoresViewMode(ScoresViewMode.HIGH))
          }
        >
          High scores
        </Button>
        <Button
          ref={setLowButtonElement}
          className={styles.viewToggleButton}
          data-active={viewMode === ScoresViewMode.LOW}
          variant="subtle"
          onClick={() =>
            dispatch(ScorekeeperActions.SetScoresViewMode(ScoresViewMode.LOW))
          }
        >
          Low scores
        </Button>
      </Group>
    </Box>
  );
}

export default ScoresViewToggle;
