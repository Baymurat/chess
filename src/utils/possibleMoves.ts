import { Cell, Piece, PieceNames, ReachableCell } from "../types/types";
import { rookMove } from "./rookHelper";
import { pawnMove } from "./pawnHelper";
import { knightMove } from "./knightHelper";
import { bishopMove } from "./bishopHelper";
import { queenMove } from "./queenHelper";
import { kingMove } from "./kingHelper";

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
