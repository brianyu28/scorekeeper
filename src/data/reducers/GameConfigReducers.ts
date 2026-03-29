import type { ScorekeeperState } from "../state/ScorekeeperState";

export const GameConfigReducers = {
  ToggleAreHigherValuesBetter: (state: ScorekeeperState) => {
    state.gameConfig.areHigherValuesBetter =
      !state.gameConfig.areHigherValuesBetter;
  },
} as const;
