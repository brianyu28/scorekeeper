import { createSlice } from "@reduxjs/toolkit";
import { PLAYER_CONFIG_PAGE } from "../../types/Page";
import { PlayerReducers } from "../reducers/PlayerReducers";
import { UiReducers } from "../reducers/UiReducers";
import type { ScorekeeperState } from "../state/ScorekeeperState";

const ACTION_NAMESPACE = "scorekeeper";

export const initialScorekeeperState: ScorekeeperState = {
  players: [],
  ui: {
    page: PLAYER_CONFIG_PAGE,
  },
};

export const scorekeeperSlice = createSlice({
  name: ACTION_NAMESPACE,
  initialState: initialScorekeeperState,
  reducers: {
    ...PlayerReducers,
    ...UiReducers,
  },
});

export const ScorekeeperActions = scorekeeperSlice.actions;
