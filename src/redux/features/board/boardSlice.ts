import { createSlice, PayloadAction, ActionCreatorWithoutPayload, SliceCaseReducers } from "@reduxjs/toolkit";
import { CellIndex, BoardStore, ReachableCell } from "../../../types/types";
import { generateBoard } from "../../../utils/initBoard";

const initialState: BoardStore = {
  board: generateBoard(),
  loading: false,
  error: "",
  selectedCellIndex: [-1, -1],
  possibleMoves: [],
  impossibleMoves: [],
  turn: "white",
  reachableCells: [],
};

const boardSlice = createSlice<BoardStore, SliceCaseReducers<BoardStore>>({
  name: "board",
  initialState,
  reducers: {
    movePiece(state, action: PayloadAction<{ from: CellIndex, to: CellIndex}>) {
      const nextTurn = state.turn === "white" ? "black" : "white";
      state.turn = nextTurn;

      const [rF, cF] = action.payload.from;
      const [rT, cT] = action.payload.to;
      state.board[rT][cT].state = state.board[rF][cF].state;
      state.board[rF][cF].state = "empty";
    },
    onClickCell(state, action: PayloadAction<{ index: CellIndex }>) {
      state;
      action;
    },
    setSelectedCell(state, action: PayloadAction<{ index: CellIndex }>) {
      const [r, c] = action.payload.index;
      if (state.board[r][c].state !== "empty") {
        state.board[r][c].isSelected = true;
        state.selectedCellIndex = [r, c];
      }
    },
    setPossibleMoves(state, action: PayloadAction<{ possibleMoves: CellIndex[] }>) {
      // action.payload.possibleMoves.forEach((move) => {
      //   const [r, c] = move;
      //   state.board[r][c].isPossibleMove = true;
      // });
      
      // state.possibleMoves = action.payload.possibleMoves;
    },
    setImpossibleMoves(state, action: PayloadAction<{ impossibleMoves: CellIndex[] }>) {
      action.payload.impossibleMoves.forEach((cell) => {
        const [r, c] = cell;
        state.board[r][c].isImpossibleMove = true;
      });
      state.impossibleMoves = action.payload.impossibleMoves;
    },
    setReachableCells(state, action: PayloadAction<{ reachableCells: ReachableCell[] }>) {
      const { reachableCells } = action.payload;
      reachableCells.forEach(({
        index, isPossibleMove, isKing 
      }) => {
        const [row, column] = index;
        state.board[row][column].isReachableCell = true;
        state.board[row][column].isPossibleMove = isPossibleMove;
        state.board[row][column].isKing = isKing;
      });
      state.reachableCells = action.payload.reachableCells;
    },
    clearValues(state) {
      state.reachableCells.forEach((cell) => {
        const [row, column] = cell.index;
        state.board[row][column].isReachableCell = false;
        state.board[row][column].isPossibleMove = false;
        state.board[row][column].isKing = false;
      });

      state.reachableCells = [];

      state.possibleMoves.forEach((move) => {
        const [r, c] = move;
        state.board[r][c].isPossibleMove = false;
      });
      state.possibleMoves = [];

      state.impossibleMoves.forEach((cell) => {
        const [r, c] = cell;
        state.board[r][c].isImpossibleMove = false;
      });
      state.impossibleMoves = [];
      
      const [rP, cP] = state.selectedCellIndex;
      if (rP !== -1 && cP !== -1) {
        state.board[rP][cP].isSelected = false;
      }
      state.selectedCellIndex = [-1, -1];
    }
  }
});

export const {
  movePiece, onClickCell, setSelectedCell, setPossibleMoves, setImpossibleMoves, setReachableCells
} = boardSlice.actions;

export const clearValues = boardSlice.actions.clearValues as ActionCreatorWithoutPayload<`${string}/${string}`>;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;
export const turnSelector = (state: { boardStore: BoardStore}) => state.boardStore.turn;

export default boardSlice.reducer;
