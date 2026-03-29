import { configureStore } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../../utils/consts/storageConsts";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import { ResetLocalStorageMiddleware } from "../middleware/ResetLocalStorageMiddleware";
import type { ScorekeeperState } from "../state/ScorekeeperState";
import { ScorekeeperStateSchema } from "./ScorekeeperSchema";
import {
  createInitialScorekeeperState,
  scorekeeperSlice,
} from "./ScorekeeperSlice";

const rootReducer = {
  scoreekeper: scorekeeperSlice.reducer,
};

function loadScorekeeperState(): ScorekeeperState {
  const storage = getLocalStorage();
  if (storage === undefined) {
    return createInitialScorekeeperState();
  }

  const rawState = storage.getItem(LOCAL_STORAGE_KEY);

  if (!rawState) {
    return createInitialScorekeeperState();
  }

  try {
    const parsed: unknown = JSON.parse(rawState);

    if (ScorekeeperStateSchema.guard(parsed)) {
      return parsed as ScorekeeperState;
    }
  } catch {
    storage.removeItem(LOCAL_STORAGE_KEY);
  }

  return createInitialScorekeeperState();
}

function persistScorekeeperState(state: ScorekeeperState) {
  const storage = getLocalStorage();
  if (storage === undefined) {
    return;
  }

  try {
    storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}

const preloadedScorekeeperState = loadScorekeeperState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    scoreekeper: preloadedScorekeeperState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ResetLocalStorageMiddleware),
});

store.subscribe(() => {
  const currentState = store.getState().scoreekeper;
  persistScorekeeperState(currentState);
});

export type RootState = ReturnType<typeof store.getState>;
