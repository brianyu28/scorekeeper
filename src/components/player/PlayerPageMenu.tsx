import { Burger, Menu } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import { PageType } from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";

interface PlayerPageMenuProps {
  playerId: PlayerId;
}

function PlayerPageMenu({ playerId }: PlayerPageMenuProps) {
  const dispatch = useDispatch();

  return (
    <Menu
      shadow="md"
      width={220}
      position="bottom-end"
      withArrow
      arrowSize={12}
      arrowPosition="center"
    >
      <Menu.Target>
        <Burger opened={false} aria-label="Open player menu" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            dispatch(
              ScorekeeperActions.ShowHistoryPage({
                playerId,
                backPage: {
                  pageType: PageType.PLAYER,
                  playerId,
                },
              }),
            )
          }
        >
          Game history
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default PlayerPageMenu;
