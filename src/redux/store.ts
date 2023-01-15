import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import boardStateReducer, { onClickCell, setSelectedCell, setPossibleMoves } from "./features/board/boardSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: onClickCell,
  effect: async (action, listenerApi) => {
    const { payload: { index } } = action;
    const { boardStore } = listenerApi.getState() as RootState;

    listenerApi.dispatch(setSelectedCell({ index }));
    listenerApi.dispatch(setPossibleMoves({ index }));
  }
});
export const store = configureStore({
  reducer: {
    boardStore: boardStateReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;