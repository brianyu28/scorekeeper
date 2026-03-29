import { createSelector } from "@reduxjs/toolkit";
import { selectScorekeeperState } from "./AppSelectors";

export const selectUiState = createSelector(
  selectScorekeeperState,
  (state) => state.ui,
);

export const selectCurrentPage = createSelector(
  selectUiState,
  (uiState) => uiState.page,
);
