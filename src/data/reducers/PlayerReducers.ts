import type { PayloadAction } from "@reduxjs/toolkit";
import { generatePlayerId } from "../../utils/player/generatePlayerId";
import type { Player } from "../../types/Player";
import type { PlayerId } from "../../types/PlayerId";
import type { ScorekeeperState } from "../state/ScorekeeperState";

function reorderPlayers(
  players: Player[],
  orderedPlayerIds: PlayerId[],
): Player[] {
  const playersById = new Map(players.map((player) => [player.id, player]));
  const reorderedPlayers: Player[] = [];
  const seenIds = new Set<PlayerId>();

  for (const playerId of orderedPlayerIds) {
    const player = playersById.get(playerId);

    if (!player || seenIds.has(playerId)) {
      continue;
    }

    seenIds.add(playerId);
    reorderedPlayers.push(player);
  }

  for (const player of players) {
    if (!seenIds.has(player.id)) {
      reorderedPlayers.push(player);
    }
  }

  return reorderedPlayers;
}

export const PlayerReducers = {
  AddPlayer: (state: ScorekeeperState, action: PayloadAction<string>) => {
    const id = generatePlayerId();

    state.players.push({
      id,
      name: action.payload,
      score: 0,
    });
  },
  RemovePlayer: (state: ScorekeeperState, action: PayloadAction<PlayerId>) => {
    state.players = state.players.filter(
      (player) => player.id !== action.payload,
    );
    state.scoreHistory = state.scoreHistory.filter(
      (entry) => entry.playerId !== action.payload,
    );
  },
  SetPlayerOrder: (
    state: ScorekeeperState,
    action: PayloadAction<PlayerId[]>,
  ) => {
    state.players = reorderPlayers(state.players, action.payload);
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

    const scoreBefore = player.score;
    player.score += action.payload.scoreDelta;
    state.scoreHistory.push({
      playerId: player.id,
      timestamp: Date.now(),
      scoreChange: action.payload.scoreDelta,
      scoreBefore,
    });
  },
} as const;
