import { Button, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerCount } from "../../data/selectors/PlayerSelectors";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import ConfiguredPlayerList from "./ConfiguredPlayerList";
import NewPlayerForm from "./NewPlayerForm";

function PlayerConfigPage() {
  const dispatch = useDispatch();
  const playerCount = useSelector(selectPlayerCount);

  const startGame = () => {
    dispatch(ScorekeeperActions.ShowScoresPage());
  };

  return (
    <Stack>
      <NewPlayerForm />
      <Button disabled={playerCount === 0} onClick={startGame}>
        Start game
        {playerCount > 0
          ? ` (${playerCount} player${playerCount > 1 ? "s" : ""})`
          : ""}
      </Button>
      <ConfiguredPlayerList />
    </Stack>
  );
}

export default PlayerConfigPage;
