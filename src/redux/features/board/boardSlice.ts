import { createSlice, PayloadAction, SliceCaseReducers, current } from "@reduxjs/toolkit";
import { CellIndex, BoardStore, Piece, Cell } from "../../../types/types";
import { generateBoard } from "../../../utils/initBoard";
import { calculatePossibleMoves } from "../../../utils/possibleMoves";

const initialState: BoardStore = {
  board: generateBoard(),
  loading: false,
  error: "",
  selectedCellIndex: [0, 0],
  possibleMoves: [],
};

const boardSlice = createSlice<BoardStore, SliceCaseReducers<BoardStore>>({
  name: "board",
  initialState,
  reducers: {
    movePiece(state, action: PayloadAction<any>) {
      console.log(action.payload);
    },
    onClickCell(state, action: PayloadAction<{ index: CellIndex }>) {
      action.payload;
    },
    setSelectedCell(state, action: PayloadAction<{ index: CellIndex }>) {
      const [cP, rP] = state.selectedCellIndex;
      state.board[cP][rP].isSelected = false;

      const [c, r] = action.payload.index;
      if (state.board[c][r].state !== "empty") {
        state.board[c][r].isSelected = true;
        state.selectedCellIndex = action.payload.index;
      }
    },
    setPossibleMoves(state, action: PayloadAction<{ index: CellIndex }>) {
      state.possibleMoves.forEach((move) => {
        const [r, c] = move;
        state.board[r][c].isPossibleMove = false;
      });

      const [c, r] = action.payload.index;
      const selected = current(state.board[c][r]);
      
      const possibleMoves = calculatePossibleMoves(state.board, selected);
      
      possibleMoves.forEach((move) => {
        const [r, c] = move;
        state.board[r][c].isPossibleMove = true;
      });
      
      state.possibleMoves = possibleMoves;
    }
  }
});

export const {
  movePiece, onClickCell, setSelectedCell, setPossibleMoves
} = boardSlice.actions;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;

export default boardSlice.reducer;
