import type { PlayerId } from "./PlayerId";

export const PageType = {
  PLAYER_CONFIG: "PlayerConfig",
  SCORES: "Scores",
  PLAYER: "Player",
} as const;
export type PageType = (typeof PageType)[keyof typeof PageType];

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

export type Page = PlayerConfigPage | ScoresPage | PlayerPage;
