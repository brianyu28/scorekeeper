import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { PLAYER_CONFIG_PAGE, ScoresViewMode } from "../../types/Page";
import type { Player } from "../../types/Player";
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
      isScoresViewSwitcherEnabled: true,
      areLiveUpdatesEnabled: false,
    },
    scoreHistory: [],
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
      state.scoreHistory = [];
    },
    ReplacePlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    ReplaceScoreHistory: (
      state,
      action: PayloadAction<ScorekeeperState["scoreHistory"]>,
    ) => {
      state.scoreHistory = action.payload;
    },
    ReloadPlayersFromLocalStorage: () => {},
    ...PlayerReducers,
    ...GameConfigReducers,
    ...UiReducers,
  },
});

export const ScorekeeperActions = scorekeeperSlice.actions;
