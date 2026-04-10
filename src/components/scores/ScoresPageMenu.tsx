import { Box, Burger, Group, Menu } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAreHigherValuesBetter,
  selectAreLiveUpdatesEnabled,
  selectIsScoresViewSwitcherEnabled,
} from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { SCORES_PAGE } from "../../types/Page";

interface ScoresPageMenuProps {
  onResetPlayers: () => void;
  onResetScores: () => void;
}

function ScoresPageMenu({
  onResetPlayers,
  onResetScores,
}: ScoresPageMenuProps) {
  const dispatch = useDispatch();
  const areHigherValuesBetter = useSelector(selectAreHigherValuesBetter);
  const isScoresViewSwitcherEnabled = useSelector(
    selectIsScoresViewSwitcherEnabled,
  );
  const areLiveUpdatesEnabled = useSelector(selectAreLiveUpdatesEnabled);

  const handleToggleViewSwitcher = () => {
    dispatch(
      ScorekeeperActions.SetIsScoresViewSwitcherEnabled(
        !isScoresViewSwitcherEnabled,
      ),
    );
  };

  const handleReloadScores = () => {
    dispatch(ScorekeeperActions.ReloadPlayersFromLocalStorage());
  };

  return (
    <Menu
      shadow="md"
      width={240}
      position="bottom-end"
      withArrow
      arrowSize={12}
      arrowPosition="center"
    >
      <Menu.Target>
        <Group gap={6} align="center">
          {areLiveUpdatesEnabled ? (
            <Box
              w={8}
              h={8}
              bg="red"
              style={{ borderRadius: 9999 }}
              aria-label="Live updates enabled"
            />
          ) : null}
          <Burger opened={false} aria-label="Open scores menu" />
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            dispatch(
              ScorekeeperActions.ShowHistoryPage({
                backPage: SCORES_PAGE,
              }),
            )
          }
        >
          Game history
        </Menu.Item>
        <Menu.Item
          onClick={() => dispatch(ScorekeeperActions.ShowPlayerConfigPage())}
        >
          Edit players
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            dispatch(ScorekeeperActions.ToggleAreHigherValuesBetter())
          }
          rightSection={areHigherValuesBetter ? "On" : "Off"}
        >
          Larger scores are better
        </Menu.Item>
        <Menu.Item
          onClick={handleToggleViewSwitcher}
          rightSection={isScoresViewSwitcherEnabled ? "On" : "Off"}
        >
          View switcher
        </Menu.Item>
        <Menu.Sub position="left-start">
          <Menu.Sub.Target>
            <Menu.Sub.Item>Advanced</Menu.Sub.Item>
          </Menu.Sub.Target>
          <Menu.Sub.Dropdown>
            <Menu.Item
              onClick={() =>
                dispatch(
                  ScorekeeperActions.SetLiveUpdatesEnabled(
                    !areLiveUpdatesEnabled,
                  ),
                )
              }
              rightSection={areLiveUpdatesEnabled ? "On" : "Off"}
            >
              Live updates
            </Menu.Item>
            <Menu.Item onClick={handleReloadScores}>Reload scores</Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
        <Menu.Sub position="left-start">
          <Menu.Sub.Target>
            <Menu.Sub.Item>Reset</Menu.Sub.Item>
          </Menu.Sub.Target>
          <Menu.Sub.Dropdown>
            <Menu.Item color="red" fw={700} onClick={onResetScores}>
              Reset scores
            </Menu.Item>
            <Menu.Item color="red" fw={700} onClick={onResetPlayers}>
              Reset players
            </Menu.Item>
          </Menu.Sub.Dropdown>
        </Menu.Sub>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ScoresPageMenu;
