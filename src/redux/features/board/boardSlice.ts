import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export type Piece = {
  name: string;
  color: "white" | "black";
}

export type Cell = {
  state: "empty" | Piece; 
}

export type BoardStore = {
  board: Cell[];
  loading: boolean;
  error: string;
}

export type Move = {
  from: string;
  to: string;
}

const generateOfficerPieces = (color: "white" | "black"): Cell[] => {
  const arr: Cell[] = [];
  arr.push({ state: { name: "Rook", color }});
  arr.push({ state: { name: "Knight", color }});
  arr.push({ state: { name: "Bishop", color }});
  arr.push({ state: { name: "King", color }});
  arr.push({ state: { name: "Queen", color }});
  arr.push({ state: { name: "Bishop", color }});
  arr.push({ state: { name: "Knight", color }});
  arr.push({ state: { name: "Rook", color }});
  
  return arr;
};
const generate8Pawns = (color: "white" | "black"): Piece[] => new Array(8).fill({ name: "Pawn", color});
const generateEmptyRow = (): Cell[] => new Array(8).fill({ state: "empty"});

const generateBoard = (): Cell[] => {
  const arr: Cell[] = [
    ...generateOfficerPieces("black"),
    ...generate8Pawns("black").map((piece) => ({ state: piece})),
    ...generateEmptyRow(),
    ...generateEmptyRow(),
    ...generateEmptyRow(),
    ...generateEmptyRow(),
    ...generate8Pawns("white").map((piece) => ({ state: piece})),
    ...generateOfficerPieces("white"),
  ];

  return arr;
};

const initialState: BoardStore = {
  board: generateBoard(),
  loading: false,
  error: "",
};

const boardSlice = createSlice<BoardStore, SliceCaseReducers<BoardStore>>({
  name: "board",
  initialState,
  reducers: {
    movePiece(state, action: PayloadAction<Move>) {
      console.log(action.payload);
      
      state.board[0] = { state: "empty" };
    },
    onClickCell(state, action: PayloadAction<{index: string}>) {
      console.log(action.payload);
    }
  }
});

export const { movePiece, onClickCell } = boardSlice.actions;

export const boardSelector = (state: { boardStore: BoardStore }) => state.boardStore.board;

export default boardSlice.reducer;
