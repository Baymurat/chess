import { Cell, CellIndex, Piece, ReachableCell } from "../types/types";
import { bishopMove } from "./bishopHelper";
import { rookMove } from "./rookHelper";

export const queenMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const rookLikeMoves = rookMove(board, piece, position);
  const bishopLikeMoves = bishopMove(board, piece, position);

  return [...rookLikeMoves, ...bishopLikeMoves];
};
