import type { Page } from "../../types/Page";
import type { Player } from "../../types/Player";

export interface ScorekeeperState {
  players: Player[];
  ui: UiState;
}

export interface UiState {
  page: Page;
}
