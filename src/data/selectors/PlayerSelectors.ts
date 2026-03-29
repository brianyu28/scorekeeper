import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/Store";
import type { Player } from "../../types/Player";
import type { PlayerId } from "../../types/PlayerId";
import { ScoresViewMode } from "../../types/Page";
import { selectScorekeeperState } from "./AppSelectors";
import { selectScoresViewMode } from "./UiSelectors";

export const selectPlayers = createSelector(
  selectScorekeeperState,
  (state) => state.players,
);

export const selectPlayerCount = createSelector(
  selectPlayers,
  (players) => players.length,
);

export const selectPlayerOrder = createSelector(
  selectScorekeeperState,
  (state) => state.playerOrder,
);

export const selectPlayersInManualOrder = createSelector(
  [selectPlayers, selectPlayerOrder],
  (players, playerOrder) => {
    const playersById = new Map(players.map((player) => [player.id, player]));

    return playerOrder
      .map((playerId) => playersById.get(playerId))
      .filter((player): player is Player => player !== undefined);
  },
);

export interface PlayerWithPlace extends Player {
  place: number;
  isTied: boolean;
}

type ScoreSortDirection = "high" | "low";

function createRankedPlayersSelector(direction: ScoreSortDirection) {
  return createSelector(
    [selectPlayersInManualOrder, selectPlayerOrder],
    (players, playerOrder) => {
      const scoreCounts = players.reduce<Record<number, number>>(
        (counts, player) => {
          counts[player.score] = (counts[player.score] ?? 0) + 1;
          return counts;
        },
        {},
      );
      const orderIndex = new Map(
        playerOrder.map((playerId, index) => [playerId, index] as const),
      );
      const sortedPlayers = [...players].sort((left, right) => {
        const scoreDifference =
          direction === "high"
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
}

export const selectPlayersWithHighScores = createRankedPlayersSelector("high");
export const selectPlayersWithLowScores = createRankedPlayersSelector("low");
export const selectPlayersWithPlace = selectPlayersWithHighScores;

export const selectPlayersInManualOrderWithPlace = createSelector(
  [selectPlayersInManualOrder, selectPlayersWithHighScores],
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
    selectPlayersInManualOrderWithPlace,
    selectPlayersWithHighScores,
    selectPlayersWithLowScores,
  ],
  (viewMode, unorderedPlayers, highScorePlayers, lowScorePlayers) => {
    switch (viewMode) {
      case ScoresViewMode.UNORDERED:
        return unorderedPlayers;
      case ScoresViewMode.HIGH:
        return highScorePlayers;
      case ScoresViewMode.LOW:
        return lowScorePlayers;
      default:
        return unorderedPlayers;
    }
  },
);

export const selectPlayerById = createSelector(
  [selectPlayers, (_state: RootState, playerId: PlayerId) => playerId],
  (players, playerId) => players.find((player) => player.id === playerId),
);
