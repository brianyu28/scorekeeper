import { useSelector } from "react-redux";
import { selectCurrentPage } from "../../data/selectors/UiSelectors";
import { PageType } from "../../types/Page";
import { assertNever } from "../../utils/common/assertNever";
import PlayerConfigPage from "../playerConfig/PlayerConfigPage";

function AppContent() {
  const currentPage = useSelector(selectCurrentPage);

  switch (currentPage.pageType) {
    case PageType.PLAYER:
      return <div>TODO: Player Page</div>;
    case PageType.PLAYER_CONFIG:
      return <PlayerConfigPage />;
    case PageType.SCORES:
      return <div>TODO: Scores Page </div>;
    default:
      assertNever(currentPage);
  }
}

export default AppContent;
