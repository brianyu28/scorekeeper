import { LOCAL_STORAGE_KEY } from "../../utils/consts/storageConsts";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import type { ScorekeeperState } from "../state/ScorekeeperState";
import { ScorekeeperStateSchema } from "./ScorekeeperSchema";
import { createInitialScorekeeperState } from "./ScorekeeperSlice";

export function loadScorekeeperState(): ScorekeeperState {
  const storage = getLocalStorage();
  const initialState = createInitialScorekeeperState();

  if (storage === undefined) {
    return initialState;
  }

  const rawState = storage.getItem(LOCAL_STORAGE_KEY);

  if (!rawState) {
    return initialState;
  }

  try {
    const parsed: unknown = JSON.parse(rawState);
    if (ScorekeeperStateSchema.guard(parsed)) {
      const state = parsed as ScorekeeperState;

      return {
        ...initialState,
        ...state,
        gameConfig: {
          ...initialState.gameConfig,
          ...state.gameConfig,
        },
        ui: {
          ...initialState.ui,
          ...state.ui,
        },
      };
    }

    storage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    storage.removeItem(LOCAL_STORAGE_KEY);
  }

  return initialState;
}

export function persistScorekeeperState(state: ScorekeeperState) {
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

export function clearPersistedScorekeeperState() {
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
