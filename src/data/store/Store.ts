import { configureStore } from "@reduxjs/toolkit";
import { scorekeeperSlice } from "./ScorekeeperSlice";

const rootReducer = {
  scoreekeper: scorekeeperSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
