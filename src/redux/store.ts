import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import { CellIndex, Piece, PieceNames } from "../types/types";
import { canAlliesSaveKing,getKingPosition, hasEscapeCell, isKingInDanger } from "../utils/kingHelper";
import { isPawnPromoteable } from "../utils/pawnHelper";
import { calculateReachableCells } from "../utils/possibleMoves";
import { timerInstance } from "../utils/timer";
import boardStateReducer, {
  addMove,
  clearValues,
  movePiece,
  onClickCell,
  promotePawn,
  restartGame,
  setBoardState,
  setGameIsOver,
  setKingDangerState,
  setPromotionIndex,
  setReachableCells,
  setSelectedCell,
  setTurn,
} from "./features/board/boardSlice";
import timerReducer, { setIsStarted,setTime } from "./features/timer/timerSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: onClickCell,
  effect: async (action, listenerApi) => {
    const { payload: { index } } = action;
    const { boardStore } = listenerApi.getState() as RootState;

    if (boardStore.isBoardDisabled) {
      return;
    }

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

    if (isPawnPromoteable(boardStore.board[to[0]][to[1]].state, to)) {
      listenerApi.dispatch(setPromotionIndex({ index: to }));
      listenerApi.dispatch(setBoardState({ isBoardDisabled: true }));
      return;
    }

    const nextTurn = boardStore.turn === "white" ? "black": "white";
    listenerApi.dispatch(setTurn({ turn: nextTurn }));

    const piece = boardStore.board[to[0]][to[1]].state as Piece;
    listenerApi.dispatch(addMove({
      piece, from, to
    }));

    const kingPosition = getKingPosition(boardStore.board, nextTurn);
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
  actionCreator: movePiece,
  effect: async (action, listenerApi) => {
    const { timerStore } = listenerApi.getState() as RootState;

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

listenerMiddleware.startListening({
  actionCreator: promotePawn,
  effect: async (action, listenerApi) => {
    const { index } = action.payload;
    const { boardStore } = listenerApi.getState() as RootState;

    const nextTurn = boardStore.turn === "white" ? "black": "white";
    listenerApi.dispatch(setTurn({ turn: nextTurn }));

    const [row, column] = index;
    const from: CellIndex = [nextTurn === "white" ? row + 1 : row - 1, column];
    const to = index;

    listenerApi.dispatch(addMove({
      piece: { name: PieceNames.PAWN, color: nextTurn === "white" ? "black" : "white" },
      from,
      to,
    }));

    const kingPosition = getKingPosition(boardStore.board, nextTurn);
    const kingInDanger = isKingInDanger(boardStore.board, kingPosition);

    listenerApi.dispatch(setKingDangerState({ index: kingPosition, inDanger: kingInDanger }));
    listenerApi.dispatch(setBoardState({ isBoardDisabled: false }));
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