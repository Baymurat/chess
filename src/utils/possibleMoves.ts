import { Cell, Piece, PieceNames, ReachableCell } from "../types/types";
import { rookMove2 } from "./rookHelper";
import { pawnMove2 } from "./pawnHelper";
import { knightMove2 } from "./knightHelper";
import { bishopMove2 } from "./bishopHelper";
import { queenMove2 } from "./queenHelper";
import { kingMove2 } from "./kingHelper";

export const calculateReachableCells = (board: Cell[][], selected: Cell): ReachableCell[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.ROOK) {
    return rookMove2(board, piece, position);
  }

  if (piece.name === PieceNames.KNIGHT) {
    return knightMove2(board, piece, position);
  }

  if (piece.name === PieceNames.BISHOP) {
    return bishopMove2(board, piece, position);
  }

  if (piece.name === PieceNames.QUEEN) {
    return queenMove2(board, piece, position);
  }

  if (piece.name === PieceNames.PAWN) {
    return pawnMove2(board, piece, position);
  }

  if (piece.name === PieceNames.KING) {
    return kingMove2(board, piece, position);
  }

  return [];
};
