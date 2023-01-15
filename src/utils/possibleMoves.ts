import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";

export const calculatePossibleMoves = (board: Cell[][], selected: Cell): CellIndex[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.PAWN) {
    return pawnMove(board, piece, position);
  }
  const a = 1;
  
  return [];
};

const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const p1 = piece.color === "white" ? 1 : -1;
  const p2 = piece.color === "white" ? 2 : -2;

  const r1 = row + p1;
  const r2 = row + p2;

  if (board[r1][column].state === "empty") {
    result.push([r1, column]);
  }

  if (board[r2][column].state === "empty") {
    result.push([r2, column]);
  }
  
  return result;
};