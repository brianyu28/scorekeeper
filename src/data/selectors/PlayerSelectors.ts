import { createSelector } from "@reduxjs/toolkit";
import { selectScorekeeperState } from "./AppSelectors";

export const selectPlayers = createSelector(
  selectScorekeeperState,
  (state) => state.players,
);

export const selectPlayerCount = createSelector(
  selectPlayers,
  (players) => players.length,
);
