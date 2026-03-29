import type { PlayerId } from "./PlayerId";

export interface Player {
  readonly id: PlayerId;
  readonly name: string;
  readonly score: number;
}
