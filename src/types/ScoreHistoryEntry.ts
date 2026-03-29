import type { PlayerId } from "./PlayerId";

export interface ScoreHistoryEntry {
  readonly playerId: PlayerId;
  readonly timestamp: number;
  readonly scoreChange: number;
  readonly scoreBefore: number;
}
