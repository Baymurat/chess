import { Cell, Piece, PieceNames, ReachableCell } from "../types/types";
import { bishopMove } from "./bishopHelper";
import { kingMove } from "./kingHelper";
import { knightMove } from "./knightHelper";
import { pawnMove } from "./pawnHelper";
import { queenMove } from "./queenHelper";
import { rookMove } from "./rookHelper";

export const calculateReachableCells = (board: Cell[][], selected: Cell): ReachableCell[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.ROOK) {
    return rookMove(board, piece, position);
  }

  if (piece.name === PieceNames.KNIGHT) {
    return knightMove(board, piece, position);
  }

  if (piece.name === PieceNames.BISHOP) {
    return bishopMove(board, piece, position);
  }

  if (piece.name === PieceNames.QUEEN) {
    return queenMove(board, piece, position);
  }

  if (piece.name === PieceNames.PAWN) {
    return pawnMove(board, piece, position);
  }

  if (piece.name === PieceNames.KING) {
    return kingMove(board, piece.color, position);
  }

  return [];
};
