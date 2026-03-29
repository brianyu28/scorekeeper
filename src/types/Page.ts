import type { PlayerId } from "./PlayerId";

export const PageType = {
  PLAYER_CONFIG: "PlayerConfig",
  SCORES: "Scores",
  PLAYER: "Player",
  HISTORY: "History",
} as const;
export type PageType = (typeof PageType)[keyof typeof PageType];

export const ScoresViewMode = {
  CUSTOM: "custom",
  BY_SCORE: "by-score",
} as const;
export type ScoresViewMode =
  (typeof ScoresViewMode)[keyof typeof ScoresViewMode];

export interface PlayerConfigPage {
  pageType: typeof PageType.PLAYER_CONFIG;
}

export const PLAYER_CONFIG_PAGE: PlayerConfigPage = {
  pageType: PageType.PLAYER_CONFIG,
};

export interface ScoresPage {
  pageType: typeof PageType.SCORES;
}

export const SCORES_PAGE: ScoresPage = {
  pageType: PageType.SCORES,
};

export interface PlayerPage {
  pageType: typeof PageType.PLAYER;
  playerId: PlayerId;
}

export interface HistoryPage {
  pageType: typeof PageType.HISTORY;
  playerId?: PlayerId;
}

export type PageWithoutHistory = PlayerConfigPage | ScoresPage | PlayerPage;
export type Page = PageWithoutHistory | HistoryPage;
