import { configureStore } from "@reduxjs/toolkit";
import {
  PLAYER_CONFIG_PAGE,
  PageType,
  SCORES_PAGE,
  ScoresViewMode,
  type Page,
} from "../../types/Page";
import type { Player } from "../../types/Player";
import type { PlayerId } from "../../types/PlayerId";
import {
  createInitialScorekeeperState,
  scorekeeperSlice,
} from "./ScorekeeperSlice";
import type { ScorekeeperState } from "../state/ScorekeeperState";

const rootReducer = {
  scoreekeper: scorekeeperSlice.reducer,
};

const STORAGE_KEY = "scorekeeper.state";
const STORAGE_VERSION = 1;

interface PersistedScorekeeperState {
  version: number;
  state: ScorekeeperState;
}

function getLocalStorage(): Storage | undefined {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return undefined;
  }

  return globalThis.localStorage;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isScoresViewMode(value: unknown): value is ScoresViewMode {
  return (
    value === ScoresViewMode.UNORDERED ||
    value === ScoresViewMode.HIGH ||
    value === ScoresViewMode.LOW
  );
}

function isPageType(value: unknown): value is PageType {
  return (
    value === PageType.PLAYER_CONFIG ||
    value === PageType.SCORES ||
    value === PageType.PLAYER
  );
}

function normalizePlayers(rawPlayers: unknown): Player[] {
  if (!Array.isArray(rawPlayers)) {
    return [];
  }

  const players: Player[] = [];
  const seenIds = new Set<string>();

  for (const candidate of rawPlayers) {
    if (!isRecord(candidate)) {
      continue;
    }

    const { id, name, score } = candidate;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof score !== "number" ||
      !Number.isFinite(score) ||
      seenIds.has(id)
    ) {
      continue;
    }

    seenIds.add(id);
    players.push({
      id: id as PlayerId,
      name,
      score,
    });
  }

  return players;
}

function normalizePlayerOrder(
  rawPlayerOrder: unknown,
  players: Player[],
): PlayerId[] {
  const playerIds = new Set(players.map((player) => player.id));
  const normalizedOrder: PlayerId[] = [];
  const seenIds = new Set<string>();

  if (Array.isArray(rawPlayerOrder)) {
    for (const candidate of rawPlayerOrder) {
      if (
        typeof candidate !== "string" ||
        !playerIds.has(candidate as PlayerId) ||
        seenIds.has(candidate)
      ) {
        continue;
      }

      seenIds.add(candidate);
      normalizedOrder.push(candidate as PlayerId);
    }
  }

  for (const player of players) {
    if (!seenIds.has(player.id)) {
      normalizedOrder.push(player.id);
    }
  }

  return normalizedOrder;
}

function normalizePage(
  rawPage: unknown,
  players: Player[],
  fallbackPage: Page,
): Page {
  if (!isRecord(rawPage) || !isPageType(rawPage.pageType)) {
    return fallbackPage;
  }

  switch (rawPage.pageType) {
    case PageType.PLAYER_CONFIG:
      return PLAYER_CONFIG_PAGE;
    case PageType.SCORES:
      return SCORES_PAGE;
    case PageType.PLAYER: {
      const { playerId } = rawPage;

      if (
        typeof playerId !== "string" ||
        !players.some((player) => player.id === playerId)
      ) {
        return fallbackPage;
      }

      return {
        pageType: PageType.PLAYER,
        playerId: playerId as PlayerId,
      };
    }
    default:
      return fallbackPage;
  }
}

function normalizeUiState(
  rawUi: unknown,
  players: Player[],
): ScorekeeperState["ui"] {
  const fallbackPage = players.length > 0 ? SCORES_PAGE : PLAYER_CONFIG_PAGE;
  const initialUi = createInitialScorekeeperState().ui;

  if (!isRecord(rawUi)) {
    return {
      page: fallbackPage,
      scoresViewMode: initialUi.scoresViewMode,
    };
  }

  return {
    page: normalizePage(rawUi.page, players, fallbackPage),
    scoresViewMode: isScoresViewMode(rawUi.scoresViewMode)
      ? rawUi.scoresViewMode
      : initialUi.scoresViewMode,
  };
}

function normalizeScorekeeperState(rawState: unknown): ScorekeeperState {
  const rawRecord = isRecord(rawState) ? rawState : {};
  const players = normalizePlayers(rawRecord.players);

  return {
    players,
    playerOrder: normalizePlayerOrder(rawRecord.playerOrder, players),
    ui: normalizeUiState(rawRecord.ui, players),
  };
}

function loadScorekeeperState(): ScorekeeperState {
  const storage = getLocalStorage();

  if (!storage) {
    return createInitialScorekeeperState();
  }

  const rawState = storage.getItem(STORAGE_KEY);

  if (!rawState) {
    return createInitialScorekeeperState();
  }

  try {
    const parsed: unknown = JSON.parse(rawState);

    if (
      isRecord(parsed) &&
      parsed.version === STORAGE_VERSION &&
      isRecord(parsed.state)
    ) {
      return normalizeScorekeeperState(parsed.state);
    }

    return normalizeScorekeeperState(parsed);
  } catch {
    return createInitialScorekeeperState();
  }
}

function persistScorekeeperState(state: ScorekeeperState) {
  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  try {
    const payload: PersistedScorekeeperState = {
      version: STORAGE_VERSION,
      state,
    };

    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota and privacy mode failures.
  }
}

const preloadedScorekeeperState = loadScorekeeperState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    scoreekeper: preloadedScorekeeperState,
  },
});

let lastSerializedState = JSON.stringify(preloadedScorekeeperState);

store.subscribe(() => {
  const currentState = store.getState().scoreekeper;
  const nextSerializedState = JSON.stringify(currentState);

  if (nextSerializedState === lastSerializedState) {
    return;
  }

  lastSerializedState = nextSerializedState;
  persistScorekeeperState(currentState);
});

export type RootState = ReturnType<typeof store.getState>;
