import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export type Piece = {
  name: string;
  color: "white" | "black";
}

type CellIndex = [number, number]

export type Cell = {
  state: "empty" | Piece; 
  index: CellIndex;
  isSelected: boolean;
  isPossibleMove: boolean;
  isWhite: boolean;
}

export type BoardStore = {
  board: Cell[][];
  loading: boolean;
  error: string;
  selectedCellIndex: CellIndex;
  possibleMoves: Cell[];
}

export type Move = {
  from: string;
  to: string;
}

const initCell = (state: "empty" | Piece, isWhite: boolean): Cell => ({
  isPossibleMove: false,
  isSelected: false,
  index: [0, 0],
  state,
  isWhite,
});

const initRowIndexes = (
  arr: Cell[], row: number
) => arr.map((c, i) => ({
  ...c, 
  index: [row - 1, i]  as [number, number],
  isWhite: (row + i) % 2 === 0,
}));

const generateOfficerPieces = (color: "white" | "black"): Cell[] => {
  const arr: Cell[] = [];
  arr.push(initCell({ name: "Rook", color }, true));
  arr.push(initCell({ name: "Knight", color }, false));
  arr.push(initCell({ name: "Bishop", color }, true));
  arr.push(initCell({ name: "King", color }, false));
  arr.push(initCell({ name: "Queen", color }, true));
  arr.push(initCell({ name: "Bishop", color }, false));
  arr.push(initCell({ name: "Knight", color }, true));
  arr.push(initCell({ name: "Rook", color }, false));
  
  return arr;
};
const generate8Pawns = (color: "white" | "black"): Cell[] => new Array(8).fill(initCell({ name: "Pawn", color }, true));
const generateEmptyRow = (): Cell[] => new Array(8).fill(initCell("empty", false));

const generateBoard = (): Cell[][] => {
  const arr: Cell[][] = [
    initRowIndexes(generateOfficerPieces("black"), 1),
    initRowIndexes(generate8Pawns("black"), 2),
    initRowIndexes(generateEmptyRow(), 3),
    initRowIndexes(generateEmptyRow(), 4),
    initRowIndexes(generateEmptyRow(), 5),
    initRowIndexes(generateEmptyRow(), 6),
    initRowIndexes(generate8Pawns("white"), 7),
    initRowIndexes(generateOfficerPieces("white"), 8),
  ];

  return arr;
};

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
    movePiece(state, action: PayloadAction<Move>) {
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
