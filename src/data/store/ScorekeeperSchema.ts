import {
  Array,
  Boolean,
  Literal,
  Number,
  Object,
  Optional,
  String,
  Union,
} from "runtypes";
import { PageType, ScoresViewMode } from "../../types/Page";

const HistoryEntrySchema = Object({
  playerId: String,
  timestamp: Number,
  scoreChange: Number,
  scoreBefore: Number,
}).exact();

const PlayerSchema = Object({
  id: String,
  name: String,
  score: Number,
}).exact();

const GameConfigSchema = Object({
  areHigherValuesBetter: Boolean,
}).exact();

const PageWithoutHistorySchema = Union(
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

const HistoryPageSchema = Object({
  pageType: Literal(PageType.HISTORY),
  playerId: Optional(String),
}).exact();

const PageSchema = Union(PageWithoutHistorySchema, HistoryPageSchema);

const UiSchema = Object({
  page: PageSchema,
  scoresViewMode: Union(
    Literal(ScoresViewMode.CUSTOM),
    Literal(ScoresViewMode.BY_SCORE),
  ),
  isScoresViewSwitcherEnabled: Optional(Boolean),
  areLiveUpdatesEnabled: Optional(Boolean),
  historyBackPage: Optional(PageWithoutHistorySchema),
}).exact();

export const ScorekeeperStateSchema = Object({
  players: Array(PlayerSchema),
  gameConfig: GameConfigSchema,
  ui: UiSchema,
  scoreHistory: Array(HistoryEntrySchema),
}).exact();
