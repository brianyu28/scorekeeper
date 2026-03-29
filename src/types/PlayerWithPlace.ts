import type { Player } from "./Player";

export interface PlayerWithPlace extends Player {
  place: number;
  isTied: boolean;
}
