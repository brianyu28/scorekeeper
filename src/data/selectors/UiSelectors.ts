import { createSelector } from "@reduxjs/toolkit";
import { PageType } from "../../types/Page";
import { selectScorekeeperState } from "./AppSelectors";

export const selectUiState = createSelector(
  selectScorekeeperState,
  (state) => state.ui,
);

export const selectCurrentPage = createSelector(
  selectUiState,
  (uiState) => uiState.page,
);

export const selectCurrentPlayerId = createSelector(
  selectCurrentPage,
  (page) => (page.pageType === PageType.PLAYER ? page.playerId : undefined),
);

export const selectScoresViewMode = createSelector(
  selectUiState,
  (uiState) => uiState.scoresViewMode,
);
