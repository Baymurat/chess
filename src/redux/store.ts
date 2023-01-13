import { configureStore } from "@reduxjs/toolkit";
import boardStateReducer from "./features/board/boardSlice";

export const store = configureStore({
  reducer: {
    boardStore: boardStateReducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;