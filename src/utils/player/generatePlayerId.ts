import { v4 as uuidv4 } from "uuid";
import type { PlayerId } from "../../types/PlayerId";

export function generatePlayerId(): PlayerId {
  return uuidv4() as PlayerId;
}
