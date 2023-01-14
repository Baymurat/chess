import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { CellIndex, Cell, BoardStore } from "../../../types/types";
import { generateBoard } from "../../../utils/initBoard";

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
    onClickCell(state, action: PayloadAction<{ index: [number, number] }>) {
      console.log(action.payload);
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
    setPossibleMoves(state, action: PayloadAction<Cell[]>) {
      state.possibleMoves = action.payload;
    }
  }
});

export const {
  movePiece, onClickCell, setSelectedCell 
} = boardSlice.actions;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;

export default boardSlice.reducer;
