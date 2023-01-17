import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";
import { rookMove, canRookReach } from "./rookHelper";
import { pawnMove } from "./pawnHelper";
import { knightMove } from "./knightHelper";
import { bishopMove } from "./bishopHelper";
import { kingMove } from "./kingHelper";

export const calculateImpossibleMoves = (board: Cell[][], piece: Piece, possibleMoves: CellIndex[]): CellIndex[] => {
  const result: CellIndex[] = [];
  const enemies = getEnemies(board, piece.color);

  for (let i = 0; i < possibleMoves.length; i++) {
    const [row, column] = possibleMoves[i];

    for (let j = 0; j < enemies.length; j++) {
      const enemyPiece = enemies[j].state as Piece;

      if (enemyPiece.name === PieceNames.ROOK && canRookReach(board, enemies[j], possibleMoves[i])) {
        result.push([row, column]);
      }
    }
  }

  return result;
};

export const calculatePossibleMoves = (board: Cell[][], selected: Cell): CellIndex[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.PAWN) {
    return pawnMove(board, piece, position);
  }

  if (piece.name === PieceNames.KNIGHT) {
    return knightMove(board, piece, position);
  }

  if (piece.name === PieceNames.ROOK) {
    return rookMove(board, piece, position);
  }
  
  if (piece.name === PieceNames.BISHOP) {
    return bishopMove(board, piece, position);
  }

  if (piece.name === PieceNames.QUEEN) {
    const rookMoves = rookMove(board, piece, position);
    const bishopMoves = bishopMove(board, piece, position);
  
    return [...rookMoves, ...bishopMoves];
  }

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
