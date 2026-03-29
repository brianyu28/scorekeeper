import type { Page, ScoresViewMode } from "../../types/Page";
import type { Player } from "../../types/Player";

export interface ScorekeeperState {
  players: Player[];
  gameConfig: GameConfig;
  ui: UiState;
}

export interface GameConfig {
  areHigherValuesBetter: boolean;
}

export interface UiState {
  page: Page;
  scoresViewMode: ScoresViewMode;
}
