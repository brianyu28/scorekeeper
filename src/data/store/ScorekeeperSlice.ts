import { createSlice } from "@reduxjs/toolkit";
import { PLAYER_CONFIG_PAGE, ScoresViewMode } from "../../types/Page";
import { GameConfigReducers } from "../reducers/GameConfigReducers";
import { PlayerReducers } from "../reducers/PlayerReducers";
import { UiReducers } from "../reducers/UiReducers";
import type { ScorekeeperState } from "../state/ScorekeeperState";

const ACTION_NAMESPACE = "scorekeeper";

export function createInitialScorekeeperState(): ScorekeeperState {
  return {
    players: [],
    gameConfig: {
      areHigherValuesBetter: true,
    },
    ui: {
      page: PLAYER_CONFIG_PAGE,
      scoresViewMode: ScoresViewMode.CUSTOM,
    },
  };
}

export const initialScorekeeperState = createInitialScorekeeperState();

export const scorekeeperSlice = createSlice({
  name: ACTION_NAMESPACE,
  initialState: initialScorekeeperState,
  reducers: {
    ResetPlayers: () => createInitialScorekeeperState(),
    ResetScores: (state) => {
      state.players.forEach((player) => {
        player.score = 0;
      });
    },
    ...PlayerReducers,
    ...GameConfigReducers,
    ...UiReducers,
  },
});

export const ScorekeeperActions = scorekeeperSlice.actions;
