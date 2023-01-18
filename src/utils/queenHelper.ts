import { Cell, Piece, CellIndex } from "../types/types";
import { rookMove, canRookReach } from "./rookHelper";
import { bishopMove, canBishopReach } from "./bishopHelper";

export const queenMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const rookLikeMoves = rookMove(board, piece, position);
  const bishopLikeMoves = bishopMove(board, piece, position);

  return [...rookLikeMoves, ...bishopLikeMoves];
};

export const canQueenReach = (
  board: Cell[][], 
  queenCell: Cell, 
  targetCell: CellIndex
): boolean => (
  canRookReach(board, queenCell, targetCell) 
  || canBishopReach(board, queenCell, targetCell)
);