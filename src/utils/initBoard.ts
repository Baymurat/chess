import { Piece, Cell, CellIndex, PieceColor } from "../types/types";
import { PieceNames } from "../types/types";

const initCell = (state: "empty" | Piece): Cell => ({
  isPossibleMove: false,
  isSelected: false,
  index: [0, 0],
  isWhite: false,
  state,
});

const initRowIndexes = (
  arr: Cell[], row: number
): Cell[] => arr.map((c, i) => ({
  ...c, 
  index: [row - 1, i]  as [number, number],
  isWhite: (row + i) % 2 === 0,
}));

const generateOfficerPieces = (color: PieceColor): Cell[] => {
  const arr: Cell[] = [];
  arr.push(initCell({ name: PieceNames.ROOK, color }));
  arr.push(initCell({ name: PieceNames.KNIGHT, color }));
  arr.push(initCell({ name: PieceNames.BISHOP, color }));
  arr.push(initCell({ name: PieceNames.KING, color }));
  arr.push(initCell({ name: PieceNames.QUEEN, color }));
  arr.push(initCell({ name: PieceNames.BISHOP, color }));
  arr.push(initCell({ name: PieceNames.KNIGHT, color }));
  arr.push(initCell({ name: PieceNames.ROOK, color }));
  
  return arr;
};
const generate8Pawns = (
  color: PieceColor
): Cell[] => new Array(8).fill(initCell({ name: PieceNames.PAWN, color }));
const generateEmptyRow = (): Cell[] => new Array(8).fill(initCell("empty"));

export const generateBoard = (): Cell[][] => {
  const arr: Cell[][] = [
    initRowIndexes(generateOfficerPieces("white"), 1),
    initRowIndexes(generate8Pawns("white"), 2),
    initRowIndexes(generateEmptyRow(), 3),
    initRowIndexes(generateEmptyRow(), 4),
    initRowIndexes(generateEmptyRow(), 5),
    initRowIndexes(generateEmptyRow(), 6),
    initRowIndexes(generate8Pawns("black"), 7),
    initRowIndexes(generateOfficerPieces("black"), 8),
  ];

  return arr;
};