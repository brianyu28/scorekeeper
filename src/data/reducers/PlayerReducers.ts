import type { PayloadAction } from "@reduxjs/toolkit";
import { generatePlayerId } from "../../utils/player/generatePlayerId";
import type { PlayerId } from "../../types/PlayerId";
import type { ScorekeeperState } from "../state/ScorekeeperState";

export const PlayerReducers = {
  AddPlayer: (state: ScorekeeperState, action: PayloadAction<string>) => {
    const id = generatePlayerId();

    state.players.push({
      id,
      name: action.payload,
      score: 0,
    });
    state.playerOrder.push(id);
  },
  RemovePlayer: (state: ScorekeeperState, action: PayloadAction<PlayerId>) => {
    state.players = state.players.filter(
      (player) => player.id !== action.payload,
    );
    state.playerOrder = state.playerOrder.filter(
      (playerId) => playerId !== action.payload,
    );
  },
  SetPlayerOrder: (
    state: ScorekeeperState,
    action: PayloadAction<PlayerId[]>,
  ) => {
    state.playerOrder = action.payload;
  },
  UpdatePlayerScore: (
    state: ScorekeeperState,
    action: PayloadAction<{ playerId: PlayerId; scoreDelta: number }>,
  ) => {
    const player = state.players.find(
      (candidate) => candidate.id === action.payload.playerId,
    );

    if (!player) {
      return;
    }

    player.score += action.payload.scoreDelta;
  },
} as const;
