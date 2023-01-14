import { Piece, Cell } from "../types/types";

const initCell = (state: "empty" | Piece, isWhite = false): Cell => ({
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
  arr.push(initCell({ name: "Knight", color }));
  arr.push(initCell({ name: "Bishop", color }, true));
  arr.push(initCell({ name: "King", color }));
  arr.push(initCell({ name: "Queen", color }, true));
  arr.push(initCell({ name: "Bishop", color }));
  arr.push(initCell({ name: "Knight", color }, true));
  arr.push(initCell({ name: "Rook", color }));
  
  return arr;
};
const generate8Pawns = (color: "white" | "black"): Cell[] => new Array(8).fill(initCell({ name: "Pawn", color }));
const generateEmptyRow = (): Cell[] => new Array(8).fill(initCell("empty"));

export const generateBoard = (): Cell[][] => {
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