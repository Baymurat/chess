import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TimerStore } from "../../../types/types";

const initialState: TimerStore = {
  time: "00:00:00",
  isStarted: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<{ time: string }>) {
      state.time = action.payload.time;
    },
    setIsStarted(state, action: PayloadAction<{ isStared: boolean }>) {
      state.isStarted = action.payload.isStared;
    }
  }
});

export const { setTime, setIsStarted } = timerSlice.actions;

export const timeSelector = (state: { timerStore: TimerStore }) => state.timerStore.time;

export default timerSlice.reducer;