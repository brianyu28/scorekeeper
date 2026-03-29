import type { PlayerId } from "./PlayerId";

export interface Player {
  readonly id: PlayerId;
  readonly name: string;
  score: number;
}
