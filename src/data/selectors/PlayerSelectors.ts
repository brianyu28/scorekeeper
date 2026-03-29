import { createSelector } from "@reduxjs/toolkit";
import { ScoresViewMode } from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";
import type { PlayerWithPlace } from "../../types/PlayerWithPlace";
import { selectScorekeeperState } from "./AppSelectors";
import { selectGameConfig, selectScoresViewMode } from "./UiSelectors";

export const selectPlayers = createSelector(
  selectScorekeeperState,
  (state) => state.players,
);

export const selectPlayerCount = createSelector(
  selectPlayers,
  (players) => players.length,
);

export const selectPlayersWithPlace = createSelector(
  [selectPlayers, selectGameConfig],
  (players, gameConfig): PlayerWithPlace[] => {
    const scoreCounts = players.reduce<Record<number, number>>(
      (counts, player) => {
        counts[player.score] = (counts[player.score] ?? 0) + 1;
        return counts;
      },
      {},
    );
    const orderIndex = new Map(
      players.map((player, index) => [player.id, index] as const),
    );
    const sortedPlayers = [...players].sort((left, right) => {
      const scoreDifference = gameConfig.areHigherValuesBetter
        ? right.score - left.score
        : left.score - right.score;

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return orderIndex.get(left.id)! - orderIndex.get(right.id)!;
    });

    let currentPlace = 0;
    let previousScore: number | undefined;

    return sortedPlayers.map((player, index) => {
      if (previousScore !== player.score) {
        currentPlace = index + 1;
        previousScore = player.score;
      }

      return {
        ...player,
        place: currentPlace,
        isTied: scoreCounts[player.score] > 1,
      };
    });
  },
);

export const selectPlayersInCustomOrderWithPlace = createSelector(
  [selectPlayers, selectPlayersWithPlace],
  (players, rankedPlayers) => {
    const rankedById = new Map(
      rankedPlayers.map((player) => [player.id, player]),
    );

    return players.map((player) => {
      const rankedPlayer = rankedById.get(player.id);

      if (!rankedPlayer) {
        return {
          ...player,
          place: 0,
          isTied: false,
        };
      }

      return {
        ...player,
        place: rankedPlayer.place,
        isTied: rankedPlayer.isTied,
      };
    });
  },
);

export const selectPlayersForScoresView = createSelector(
  [
    selectScoresViewMode,
    selectPlayersInCustomOrderWithPlace,
    selectPlayersWithPlace,
  ],
  (viewMode, customOrderPlayers, scoredPlayers) => {
    switch (viewMode) {
      case ScoresViewMode.CUSTOM:
        return customOrderPlayers;
      case ScoresViewMode.BY_SCORE:
        return scoredPlayers;
      default:
        return customOrderPlayers;
    }
  },
);

export const selectPlayerById = createSelector(
  [selectPlayers, (_, playerId: PlayerId) => playerId],
  (players, playerId) => players.find((player) => player.id === playerId),
);
