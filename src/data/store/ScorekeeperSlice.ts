import { createSlice } from "@reduxjs/toolkit";
import { PLAYER_CONFIG_PAGE, ScoresViewMode } from "../../types/Page";
import { PlayerReducers } from "../reducers/PlayerReducers";
import { UiReducers } from "../reducers/UiReducers";
import type { ScorekeeperState } from "../state/ScorekeeperState";

const ACTION_NAMESPACE = "scorekeeper";

export function createInitialScorekeeperState(): ScorekeeperState {
  return {
    players: [],
    playerOrder: [],
    ui: {
      page: PLAYER_CONFIG_PAGE,
      scoresViewMode: ScoresViewMode.UNORDERED,
    },
  };
}

export const initialScorekeeperState = createInitialScorekeeperState();

export const scorekeeperSlice = createSlice({
  name: ACTION_NAMESPACE,
  initialState: initialScorekeeperState,
  reducers: {
    ResetGame: () => createInitialScorekeeperState(),
    ...PlayerReducers,
    ...UiReducers,
  },
});

export const ScorekeeperActions = scorekeeperSlice.actions;
