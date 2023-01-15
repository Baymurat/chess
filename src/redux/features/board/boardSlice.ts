import { createSlice, PayloadAction, ActionCreatorWithoutPayload, SliceCaseReducers, current } from "@reduxjs/toolkit";
import { CellIndex, BoardStore, Piece, Cell } from "../../../types/types";
import { generateBoard } from "../../../utils/initBoard";
import { calculatePossibleMoves } from "../../../utils/possibleMoves";

const initialState: BoardStore = {
  board: generateBoard(),
  loading: false,
  error: "",
  selectedCellIndex: [-1, -1],
  possibleMoves: [],
  turn: "white",
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
      // const nextTurn = state.turn === "white" ? "black" : "white";
      // state.turn = nextTurn;
    },
    setSelectedCell(state, action: PayloadAction<{ index: CellIndex }>) {
      // const [rP, cP] = state.selectedCellIndex;
      // if (rP !== -1 && cP !== -1) {
      //   state.board[rP][cP].isSelected = false;
      // }

      const [r, c] = action.payload.index;
      if (state.board[r][c].state !== "empty") {
        state.board[r][c].isSelected = true;
        state.selectedCellIndex = [r, c];
      } 
      // else {
      //   state.selectedCellIndex = [-1, -1];
      // }
    },
    setPossibleMoves(state, action: PayloadAction<{ index: CellIndex }>) {
      // state.possibleMoves.forEach((move) => {
      //   const [r, c] = move;
      //   state.board[r][c].isPossibleMove = false;
      // });

      const [c, r] = action.payload.index;
      const selected = current(state.board[c][r]);
      
      const possibleMoves = calculatePossibleMoves(state.board, selected);
      
      possibleMoves.forEach((move) => {
        const [r, c] = move;
        state.board[r][c].isPossibleMove = true;
      });
      
      state.possibleMoves = possibleMoves;
    },
    clearValues(state) {
      state.possibleMoves.forEach((move) => {
        const [r, c] = move;
        state.board[r][c].isPossibleMove = false;
      });
      state.possibleMoves = [];

      const [rP, cP] = state.selectedCellIndex;
      if (rP !== -1 && cP !== -1) {
        state.board[rP][cP].isSelected = false;
      }
      state.selectedCellIndex = [-1, -1];
    }
  }
});

export const {
  movePiece, onClickCell, setSelectedCell, setPossibleMoves
} = boardSlice.actions;

export const clearValues = boardSlice.actions.clearValues as ActionCreatorWithoutPayload<`${string}/${string}`>;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;
export const turnSelector = (state: { boardStore: BoardStore}) => state.boardStore.turn;

export default boardSlice.reducer;
