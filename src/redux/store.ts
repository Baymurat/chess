import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { CellIndex, Piece } from "../types/types";
import boardStateReducer, { 
  onClickCell, 
  setSelectedCell, 
  setPossibleMoves,
  clearValues,
  movePiece,
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

    if (isEmpty) {
      if (clickedCell.isPossibleMove) {
        const from: CellIndex = [prevRow, prevColumn];
        const to: CellIndex = [currentRow, currentColumn];
        listenerApi.dispatch(movePiece({ from, to }));
        listenerApi.dispatch(clearValues());
      } else {
        listenerApi.dispatch(clearValues());
      }
    } else {
      const isEnemy = (clickedCell.state as Piece).color !== boardStore.turn;

      if (isEnemy) {
        if (clickedCell.isPossibleMove) {
          const from: CellIndex = [prevRow, prevColumn];
          const to: CellIndex = [currentRow, currentColumn];
          listenerApi.dispatch(movePiece({ from, to }));
          listenerApi.dispatch(clearValues());
        } else {
          listenerApi.dispatch(clearValues());
        }
      } else {
        listenerApi.dispatch(clearValues());
        listenerApi.dispatch(setSelectedCell({ index }));
        listenerApi.dispatch(setPossibleMoves({ index }));
      }
    }

    // const { payload: { index } } = action;
    // const { boardStore } = listenerApi.getState() as RootState;
    // const { board } = boardStore;
  
    // const clickedCell = board[index[0]][index[1]];
    
    // const { selectedCellIndex, possibleMoves } = boardStore;
    // const [rP, cP] = selectedCellIndex;

    // const noSelectedCell = rP === -1 && cP === -1;

    // if (noSelectedCell) {
    //   listenerApi.dispatch(setSelectedCell({ index }));
    //   listenerApi.dispatch(setPossibleMoves({ index }));

    //   return;
    // } 

    // const firstPiece = board[rP][cP].state as Piece;
    // const secondPiece = board[index[0]][index[1]].state as Piece;
    
    // if (firstPiece.color === secondPiece.color) {
    //   listenerApi.dispatch(clearValues());
    //   listenerApi.dispatch(setSelectedCell({ index }));
    //   listenerApi.dispatch(setPossibleMoves({ index }));

    //   return;
    // }

    // const nextMove = possibleMoves
    //   .find(([r, c]) => r === index[0] && c === index[1]);

    // if (nextMove) {
    //   listenerApi.dispatch(movePiece({ from: [rP, cP], to: [index[0], index[1]] }));
    // }

    // if (clickedCell.state === "empty") {
    //   listenerApi.dispatch(clearValues());
    //   return;
    // }
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