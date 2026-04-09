import { createSelector } from "@reduxjs/toolkit";
import { PageType } from "../../types/Page";
import { selectScorekeeperState } from "./AppSelectors";

export const selectUiState = createSelector(
  selectScorekeeperState,
  (state) => state.ui,
);

export const selectGameConfig = createSelector(
  selectScorekeeperState,
  (state) => state.gameConfig,
);

export const selectAreHigherValuesBetter = createSelector(
  selectGameConfig,
  (gameConfig) => gameConfig.areHigherValuesBetter,
);

export const selectCurrentPage = createSelector(
  selectUiState,
  (uiState) => uiState.page,
);

export const selectCurrentPlayerId = createSelector(
  selectCurrentPage,
  (page) => (page.pageType === PageType.PLAYER ? page.playerId : undefined),
);

export const selectCurrentHistoryPlayerId = createSelector(
  selectCurrentPage,
  (page) => (page.pageType === PageType.HISTORY ? page.playerId : undefined),
);

export const selectHistoryBackPage = createSelector(
  selectUiState,
  (uiState) => uiState.historyBackPage,
);

export const selectScoresViewMode = createSelector(
  selectUiState,
  (uiState) => uiState.scoresViewMode,
);

export const selectShowScoresViewSwitcher = createSelector(
  selectUiState,
  (uiState) => uiState.showScoresViewSwitcher,
);
