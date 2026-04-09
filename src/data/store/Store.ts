import { configureStore } from "@reduxjs/toolkit";
import { ResetLocalStorageMiddleware } from "../middleware/ResetLocalStorageMiddleware";
import { loadScorekeeperState, persistScorekeeperState } from "./persistence";
import { scorekeeperSlice } from "./ScorekeeperSlice";

const rootReducer = {
  scoreekeper: scorekeeperSlice.reducer,
};

const preloadedScorekeeperState = loadScorekeeperState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    scoreekeper: preloadedScorekeeperState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ResetLocalStorageMiddleware),
});

store.subscribe(() => {
  const currentState = store.getState().scoreekeper;
  persistScorekeeperState(currentState);
});

export type RootState = ReturnType<typeof store.getState>;
