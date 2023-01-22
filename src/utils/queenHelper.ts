import { Cell, Piece, CellIndex, ReachableCell } from "../types/types";
import { rookMove } from "./rookHelper";
import { bishopMove } from "./bishopHelper";

export const queenMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const rookLikeMoves = rookMove(board, piece, position);
  const bishopLikeMoves = bishopMove(board, piece, position);

  return [...rookLikeMoves, ...bishopLikeMoves];
};
