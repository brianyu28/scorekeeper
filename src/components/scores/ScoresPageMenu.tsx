import { Button, Menu } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectAreHigherValuesBetter } from "../../data/selectors/UiSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";

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
        <Button variant="outline">Game</Button>
      </Menu.Target>
      <Menu.Dropdown>
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
