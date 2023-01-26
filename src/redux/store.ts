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
  restartGame,
} from "./features/board/boardSlice";
import timerReducer, { setTime, setIsStarted } from "./features/timer/timerSlice";
import { isKingInDanger, getKingPosition, hasEscapeCell, canAlliesSaveKing } from "../utils/kingHelper";
import { timerInstance } from "../utils/timer";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: onClickCell,
  effect: async (action, listenerApi) => {
    const { payload: { index } } = action;
    const { boardStore, timerStore } = listenerApi.getState() as RootState;

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

        if (!timerStore.isStarted) {
          listenerApi.dispatch(setIsStarted({ isStared: true }));
          timerInstance.startTimer((timeObject) => {
            const {
              second, minute, hour 
            } = timeObject;
    
            const s = second < 10 ? `0${second}` : second;
            const m = minute < 10 ? `0${minute}` : minute;
            const h = hour < 10 ? `0${hour}` : hour;
    
            const time = `${h}:${m}:${s}`;
            
            listenerApi.dispatch(setTime({ time }));
          });
        }
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
          timerInstance.stopTimer();
        }
      }
    }
  }
});

listenerMiddleware.startListening({
  actionCreator: restartGame,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setTime({ time: "00:00:00"}));
    listenerApi.dispatch(setIsStarted({ isStared: false }));
    timerInstance.stopTimer();
  }
});

export const store = configureStore({
  reducer: {
    boardStore: boardStateReducer,
    timerStore: timerReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;