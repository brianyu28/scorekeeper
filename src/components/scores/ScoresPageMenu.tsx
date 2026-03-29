import { Button, Menu } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";

interface ScoresPageMenuProps {
  onResetGame: () => void;
}

function ScoresPageMenu({ onResetGame }: ScoresPageMenuProps) {
  const dispatch = useDispatch();

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      withArrow
      arrowSize={12}
      arrowPosition="center"
    >
      <Menu.Target>
        <Button variant="outline">Settings</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => dispatch(ScorekeeperActions.ShowPlayerConfigPage())}
        >
          Edit players
        </Menu.Item>
        <Menu.Item color="red" fw={700} onClick={onResetGame}>
          Reset game
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ScoresPageMenu;
