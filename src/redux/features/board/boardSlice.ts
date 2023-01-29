import { createSlice, PayloadAction, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { CellIndex, BoardStore, ReachableCell, Piece, PieceColor } from "../../../types/types";
import { generateBoard } from "../../../utils/initBoard";

const initialState: BoardStore = {
  board: generateBoard(),
  loading: false,
  error: "",
  selectedCellIndex: [-1, -1],
  turn: "white",
  reachableCells: [],
  inDangerKingPosition: [-1, -1],
  isGameOver: false,
  movesHistory: [],
  isBoardDisabled: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoardState(state, action: PayloadAction<{ isBoardDisabled: boolean }>) {
      state.isBoardDisabled = action.payload.isBoardDisabled;
    },
    setTurn(state, action: PayloadAction<{ turn: PieceColor }>) {
      state.turn = action.payload.turn;
    },
    setPromotionIndex(state, action: PayloadAction<{ index: CellIndex }>) {
      const [row, column] = action.payload.index;
      state.board[row][column].isPromoteable = true;
    },
    promotePawn(state, action: PayloadAction<{ index: CellIndex, piece: Piece }>) {
      const [row, column] = action.payload.index;
      state.board[row][column].state = action.payload.piece;
      state.board[row][column].isPromoteable = false;
      state.isBoardDisabled = false;
    },
    movePiece(state, action: PayloadAction<{ from: CellIndex, to: CellIndex}>) {
      const [rF, cF] = action.payload.from;
      const [rT, cT] = action.payload.to;
      state.board[rT][cT].state = state.board[rF][cF].state;
      state.board[rF][cF].state = "empty";
    },
    onClickCell(state, action: PayloadAction<{ index: CellIndex }>) {
      state;
      action;
    },
    setKingDangerState(state, action: PayloadAction<{ index: CellIndex, inDanger: boolean }>) {
      const [row, column] = action.payload.index;
      const [prevRow, prevColumn] = state.inDangerKingPosition;

      if (row === -1) {
        return;
      }

      if (prevRow !== -1) {
        state.board[prevRow][prevColumn].isTargetKing = false;
      }

      state.board[row][column].isTargetKing = action.payload.inDanger;
      state.inDangerKingPosition = [row, column];
    },
    setSelectedCell(state, action: PayloadAction<{ index: CellIndex }>) {
      const [r, c] = action.payload.index;
      if (state.board[r][c].state !== "empty") {
        state.board[r][c].isSelected = true;
        state.selectedCellIndex = [r, c];
      }
    },
    setReachableCells(state, action: PayloadAction<{ reachableCells: ReachableCell[] }>) {
      const { reachableCells } = action.payload;
      reachableCells.forEach(({
        index, isPossibleMove, isForbiddenForKing 
      }) => {
        const [row, column] = index;
        state.board[row][column].isReachableCell = true;
        state.board[row][column].isPossibleMove = isPossibleMove;
        state.board[row][column].isForbiddenForKing = isForbiddenForKing;
      });
      state.reachableCells = action.payload.reachableCells;
    },
    setGameIsOver(state) {
      state.isGameOver = true;
    },
    restartGame() {
      return initialState;
    },
    clearValues(state) {
      state.reachableCells.forEach((cell) => {
        const [row, column] = cell.index;
        state.board[row][column].isReachableCell = false;
        state.board[row][column].isPossibleMove = false;
        state.board[row][column].isForbiddenForKing = false;
      });
      state.reachableCells = [];

      const [rP, cP] = state.selectedCellIndex;
      if (rP !== -1 && cP !== -1) {
        state.board[rP][cP].isSelected = false;
      }
      state.selectedCellIndex = [-1, -1];
    },
    addMove(state, action: PayloadAction<{ from: CellIndex, to: CellIndex }>) {
      const { from, to } = action.payload;
      const [row, column] = to;

      const piece = state.board[row][column].state as Piece;
      const id: string = Math.random().toString();

      state.movesHistory.push({
        piece, from, to, id
      });
    }
  }
});

export const {
  movePiece,
  onClickCell, 
  setSelectedCell, 
  setReachableCells,
  setKingDangerState,
  addMove, 
  setTurn,
  setPromotionIndex,
  promotePawn,
  setBoardState,
} = boardSlice.actions;

export const clearValues = boardSlice.actions.clearValues as ActionCreatorWithoutPayload<`${string}/${string}`>;
export const setGameIsOver = boardSlice.actions.setGameIsOver as ActionCreatorWithoutPayload<`${string}/${string}`>;
export const restartGame = boardSlice.actions.restartGame as ActionCreatorWithoutPayload<`${string}/${string}`>;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;
export const turnSelector = (state: { boardStore: BoardStore }) => state.boardStore.turn;
export const gameOverSelector = (state: { boardStore: BoardStore }) => state.boardStore.isGameOver;
export const historySelector = (state: { boardStore: BoardStore }) => state.boardStore.movesHistory;

export default boardSlice.reducer;
