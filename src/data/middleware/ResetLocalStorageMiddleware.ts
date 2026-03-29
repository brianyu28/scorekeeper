import type { Middleware } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../../utils/consts/storageConsts";
import { hasActionType } from "../../utils/data/hasActionType";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
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
    storage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    return;
  }
}
