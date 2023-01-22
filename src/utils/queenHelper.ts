import { Cell, Piece, CellIndex, ReachableCell } from "../types/types";
import { rookMove2 } from "./rookHelper";
import { bishopMove2 } from "./bishopHelper";

export const queenMove2 = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const rookLikeMoves = rookMove2(board, piece, position);
  const bishopLikeMoves = bishopMove2(board, piece, position);

  return [...rookLikeMoves, ...bishopLikeMoves];
};
