import type { PayloadAction } from "@reduxjs/toolkit";
import { SCORES_PAGE, type ScoresViewMode } from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";
import { PLAYER_CONFIG_PAGE, PageType } from "../../types/Page";
import type { ScorekeeperState } from "../state/ScorekeeperState";

export const UiReducers = {
  ShowScoresPage: (state: ScorekeeperState) => {
    state.ui.page = SCORES_PAGE;
  },
  ShowPlayerConfigPage: (state: ScorekeeperState) => {
    state.ui.page = PLAYER_CONFIG_PAGE;
  },
  ShowPlayerPage: (
    state: ScorekeeperState,
    action: PayloadAction<PlayerId>,
  ) => {
    state.ui.page = {
      pageType: PageType.PLAYER,
      playerId: action.payload,
    };
  },
  SetScoresViewMode: (
    state: ScorekeeperState,
    action: PayloadAction<ScoresViewMode>,
  ) => {
    state.ui.scoresViewMode = action.payload;
  },
} as const;
