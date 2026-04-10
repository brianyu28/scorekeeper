import type {
  Page,
  PageWithoutHistory,
  ScoresViewMode,
} from "../../types/Page";
import type { Player } from "../../types/Player";
import type { ScoreHistoryEntry } from "../../types/ScoreHistoryEntry";

export interface ScorekeeperState {
  players: Player[];
  gameConfig: GameConfig;
  ui: UiState;
  scoreHistory: ScoreHistoryEntry[];
}

export interface GameConfig {
  areHigherValuesBetter: boolean;
}

export interface UiState {
  page: Page;
  scoresViewMode: ScoresViewMode;
  isScoresViewSwitcherEnabled: boolean;
  areLiveUpdatesEnabled: boolean;
  historyBackPage?: PageWithoutHistory;
}
