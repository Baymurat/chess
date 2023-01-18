import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { CellIndex, Piece, PieceNames } from "../types/types";
import { calculatePossibleMoves, calculateImpossibleMoves } from "../utils/possibleMoves";
import boardStateReducer, { 
  onClickCell, 
  setSelectedCell, 
  setPossibleMoves,
  clearValues,
  movePiece,
  setImpossibleMoves,
} from "./features/board/boardSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: onClickCell,
  effect: async (action, listenerApi) => {
    const { payload: { index } } = action;
    const { boardStore } = listenerApi.getState() as RootState;

    const { board } = boardStore;
    const [prevRow, prevColumn] = boardStore.selectedCellIndex;
    const [currentRow, currentColumn] = index;
    const clickedCell = board[currentRow][currentColumn];
    const isEmpty =  clickedCell.state === "empty";
    const isEnemy = (clickedCell.state as Piece).color !== boardStore.turn;

    if (isEmpty || isEnemy) {
      if (clickedCell.isPossibleMove) {
        if (!clickedCell.isImpossibleMove) {
          const from: CellIndex = [prevRow, prevColumn];
          const to: CellIndex = [currentRow, currentColumn];
          listenerApi.dispatch(movePiece({ from, to }));
          listenerApi.dispatch(clearValues());
        }
      } else {
        listenerApi.dispatch(clearValues());
      }

      return;
    }

    listenerApi.dispatch(clearValues());
    listenerApi.dispatch(setSelectedCell({ index }));

    const possibleMoves = calculatePossibleMoves(board, clickedCell);
    listenerApi.dispatch(setPossibleMoves({ possibleMoves }));
    
    if ((clickedCell.state as Piece).name === PieceNames.KING) {
      const impossibleMoves = calculateImpossibleMoves(board, clickedCell.state as Piece, possibleMoves);
      listenerApi.dispatch(setImpossibleMoves({ impossibleMoves }));
    }
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