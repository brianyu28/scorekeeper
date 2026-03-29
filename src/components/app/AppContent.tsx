import { useSelector } from "react-redux";
import PlayerPage from "../player/PlayerPage";
import ScoresPage from "../scores/ScoresPage";
import { selectCurrentPage } from "../../data/selectors/UiSelectors";
import { PageType } from "../../types/Page";
import { assertNever } from "../../utils/common/assertNever";
import PlayerConfigPage from "../playerConfig/PlayerConfigPage";

function AppContent() {
  const currentPage = useSelector(selectCurrentPage);

  switch (currentPage.pageType) {
    case PageType.PLAYER:
      return <PlayerPage playerId={currentPage.playerId} />;
    case PageType.PLAYER_CONFIG:
      return <PlayerConfigPage />;
    case PageType.SCORES:
      return <ScoresPage />;
    default:
      assertNever(currentPage);
  }
}

export default AppContent;
