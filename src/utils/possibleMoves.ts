import { Cell, Piece, PieceNames, PieceColor, CellIndex, ReachableCell } from "../types/types";
import { rookMove2, canRookReach } from "./rookHelper";
import { pawnMove2, canPawnReach } from "./pawnHelper";
import { knightMove2, canKnightReach } from "./knightHelper";
import { bishopMove2, canBishopReach } from "./bishopHelper";
import { queenMove2, canQueenReach } from "./queenHelper";
import { kingMove, canKingReach } from "./kingHelper";

export const calculateImpossibleMoves = (board: Cell[][], piece: Piece, possibleMoves: CellIndex[]): CellIndex[] => {
  const result: CellIndex[] = [];
  const enemies = getEnemies(board, piece.color);

  for (let i = 0; i < possibleMoves.length; i++) {
    const [row, column] = possibleMoves[i];

    for (let j = 0; j < enemies.length; j++) {
      const enemyPiece = enemies[j].state as Piece;

      if (enemyPiece.name === PieceNames.ROOK && canRookReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }

      if (enemyPiece.name === PieceNames.BISHOP && canBishopReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }

      if (enemyPiece.name === PieceNames.KNIGHT && canKnightReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }

      if (enemyPiece.name === PieceNames.PAWN && canPawnReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }

      if (enemyPiece.name === PieceNames.QUEEN && canQueenReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }

      if (enemyPiece.name === PieceNames.KING && canKingReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
        continue;
      }
    }
  }

  return result;
};


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

  return [];
};

export const calculatePossibleMoves = (board: Cell[][], selected: Cell): CellIndex[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.KING) {
    return kingMove(board, piece, position);
  }

  return [];
};

const getEnemies = (board: Cell[][], color: PieceColor): Cell[] => {
  const enemyPieces: Cell[] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isEnemy = board[i][j].state !== "empty" && (board[i][j].state as Piece).color !== color;

      if (isEnemy) {
        enemyPieces.push(board[i][j]);
      }
    }
  }

  return enemyPieces;
};
