import type { Middleware } from "@reduxjs/toolkit";
import { hasActionType } from "../../utils/data/hasActionType";
import {
  clearPersistedScorekeeperState,
  loadScorekeeperState,
} from "../store/persistence";
import { ScorekeeperActions } from "../store/ScorekeeperSlice";

export const ResetLocalStorageMiddleware: Middleware =
  (api) => (next) => (action) => {
    const persistedState =
      hasActionType(action) &&
      action.type === ScorekeeperActions.ReloadPlayersFromLocalStorage.type
        ? loadScorekeeperState()
        : undefined;

    const result = next(action);

    if (!hasActionType(action)) {
      return result;
    }

    if (action.type === ScorekeeperActions.ResetPlayers.type) {
      clearPersistedScorekeeperState();
    }

    if (action.type === ScorekeeperActions.ReloadPlayersFromLocalStorage.type) {
      api.dispatch(
        ScorekeeperActions.ReplacePlayers(persistedState?.players ?? []),
      );
      api.dispatch(
        ScorekeeperActions.ReplaceScoreHistory(
          persistedState?.scoreHistory ?? [],
        ),
      );
    }

    return result;
  };
