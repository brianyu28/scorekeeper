import { SCORES_PAGE } from "../../types/Page";
import type { ScorekeeperState } from "../state/ScorekeeperState";

export const UiReducers = {
  ShowScoresPage: (state: ScorekeeperState) => {
    state.ui.page = SCORES_PAGE;
  },
} as const;
