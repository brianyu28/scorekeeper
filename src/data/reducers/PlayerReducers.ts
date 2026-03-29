import type { PayloadAction } from "@reduxjs/toolkit";
import { generatePlayerId } from "../../utils/player/generatePlayerId";
import type { ScorekeeperState } from "../state/ScorekeeperState";

export const PlayerReducers = {
  AddPlayer: (state: ScorekeeperState, action: PayloadAction<string>) => {
    state.players.push({
      id: generatePlayerId(),
      name: action.payload,
      score: 0,
    });
  },
} as const;
