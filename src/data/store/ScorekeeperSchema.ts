import {
  Array,
  Boolean,
  Literal,
  Number,
  Object,
  String,
  Union,
} from "runtypes";
import { PageType, ScoresViewMode } from "../../types/Page";

const PlayerSchema = Object({
  id: String,
  name: String,
  score: Number,
}).exact();

const GameConfigSchema = Object({
  areHigherValuesBetter: Boolean,
}).exact();

const PageSchema = Union(
  Object({
    pageType: Literal(PageType.PLAYER_CONFIG),
  }).exact(),
  Object({
    pageType: Literal(PageType.SCORES),
  }).exact(),
  Object({
    pageType: Literal(PageType.PLAYER),
    playerId: String,
  }).exact(),
);

const UiSchema = Object({
  page: PageSchema,
  scoresViewMode: Union(
    Literal(ScoresViewMode.CUSTOM),
    Literal(ScoresViewMode.BY_SCORE),
  ),
}).exact();

export const ScorekeeperStateSchema = Object({
  players: Array(PlayerSchema),
  gameConfig: GameConfigSchema,
  ui: UiSchema,
}).exact();
