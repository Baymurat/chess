import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { CellIndex, Piece } from "../types/types";
import { calculateReachableCells } from "../utils/possibleMoves";
import boardStateReducer, { 
  onClickCell, 
  setSelectedCell, 
  clearValues,
  movePiece,
  setReachableCells,
  setKingDangerState,
  setGameIsOver,
  addMove,
} from "./features/board/boardSlice";
import { isKingInDanger, getKingPosition, hasEscapeCell, canAlliesSaveKing } from "../utils/kingHelper";

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
        const from: CellIndex = [prevRow, prevColumn];
        const to: CellIndex = [currentRow, currentColumn];
        listenerApi.dispatch(movePiece({ from, to }));
        listenerApi.dispatch(clearValues());
      } else {
        listenerApi.dispatch(clearValues());
      }

      return;
    }

    listenerApi.dispatch(clearValues());
    listenerApi.dispatch(setSelectedCell({ index }));

    const reachableCells = calculateReachableCells(board, clickedCell);
    listenerApi.dispatch(setReachableCells({ reachableCells }));
  }
});

listenerMiddleware.startListening({
  actionCreator: movePiece,
  effect: async (action, listenerApi) => {
    const { boardStore } = listenerApi.getState() as RootState;
    const { from, to } = action.payload;

    listenerApi.dispatch(addMove({ from, to }));

    const kingPosition = getKingPosition(boardStore.board, boardStore.turn);
    const kingInDanger = isKingInDanger(boardStore.board, kingPosition);

    listenerApi.dispatch(setKingDangerState({ index: kingPosition, inDanger: kingInDanger }));
  }
});

listenerMiddleware.startListening({
  actionCreator: setKingDangerState,
  effect: async (action, listenerApi) => {
    const { inDanger } = action.payload;
    if (inDanger) {
      const { boardStore } = listenerApi.getState() as RootState;
      const canEscape = hasEscapeCell(boardStore.board, boardStore.turn);

      if (!canEscape) {
        const canAlliesSave = canAlliesSaveKing(boardStore.board, boardStore.turn);

        if (!canAlliesSave) {
          listenerApi.dispatch(setGameIsOver());
        }
      }
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