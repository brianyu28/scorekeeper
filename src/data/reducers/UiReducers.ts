import type { PayloadAction } from "@reduxjs/toolkit";
import {
  PLAYER_CONFIG_PAGE,
  PageType,
  SCORES_PAGE,
  type PageWithoutHistory,
  type ScoresViewMode,
} from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";
import type { ScorekeeperState } from "../state/ScorekeeperState";

export const UiReducers = {
  ShowScoresPage: (state: ScorekeeperState) => {
    state.ui.page = SCORES_PAGE;
    state.ui.historyBackPage = undefined;
  },
  ShowPlayerConfigPage: (state: ScorekeeperState) => {
    state.ui.page = PLAYER_CONFIG_PAGE;
    state.ui.historyBackPage = undefined;
  },
  ShowPlayerPage: (
    state: ScorekeeperState,
    action: PayloadAction<PlayerId>,
  ) => {
    state.ui.page = {
      pageType: PageType.PLAYER,
      playerId: action.payload,
    };
    state.ui.historyBackPage = undefined;
  },
  SetScoresViewMode: (
    state: ScorekeeperState,
    action: PayloadAction<ScoresViewMode>,
  ) => {
    state.ui.scoresViewMode = action.payload;
  },
  ShowHistoryPage: (
    state: ScorekeeperState,
    action: PayloadAction<{
      backPage: PageWithoutHistory;
      playerId?: PlayerId;
    }>,
  ) => {
    state.ui.page = {
      pageType: PageType.HISTORY,
      playerId: action.payload.playerId,
    };
    state.ui.historyBackPage = action.payload.backPage;
  },
  ShowPreviousPage: (state: ScorekeeperState) => {
    state.ui.page = state.ui.historyBackPage ?? SCORES_PAGE;
    state.ui.historyBackPage = undefined;
  },
} as const;
