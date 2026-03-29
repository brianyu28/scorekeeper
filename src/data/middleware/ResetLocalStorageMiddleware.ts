import type { Middleware } from "@reduxjs/toolkit";
import { hasActionType } from "../../utils/data/hasActionType";
import { ScorekeeperActions } from "../store/ScorekeeperSlice";

export const ResetLocalStorageMiddleware: Middleware =
  () => (next) => (action) => {
    const result = next(action);

    if (
      hasActionType(action) &&
      action.type === ScorekeeperActions.ResetPlayers.type
    ) {
      clearPersistedScorekeeperState();
    }

    return result;
  };

function clearPersistedScorekeeperState() {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage quota and privacy mode failures.
  }
}
