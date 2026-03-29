import { createSelector } from "@reduxjs/toolkit";
import type { PlayerId } from "../../types/PlayerId";
import { selectScorekeeperState } from "./AppSelectors";

export const selectScoreHistoryEntries = createSelector(
  selectScorekeeperState,
  (state) => state.scoreHistory,
);

export const selectScoreHistoryEntriesForPlayer = createSelector(
  [
    selectScoreHistoryEntries,
    (_state: unknown, playerId?: PlayerId) => playerId,
  ],
  (entries, playerId) => {
    const filteredEntries =
      playerId === undefined
        ? entries
        : entries.filter((entry) => entry.playerId === playerId);

    return [...filteredEntries].reverse();
  },
);
