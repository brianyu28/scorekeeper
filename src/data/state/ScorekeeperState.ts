import type { Page, ScoresViewMode } from "../../types/Page";
import type { PlayerId } from "../../types/PlayerId";
import type { Player } from "../../types/Player";

export interface ScorekeeperState {
  players: Player[];
  playerOrder: PlayerId[];
  ui: UiState;
}

export interface UiState {
  page: Page;
  scoresViewMode: ScoresViewMode;
}
