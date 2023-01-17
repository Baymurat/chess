import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";
import { rookMove, canRookReach } from "./rookHelper";
import { pawnMove } from "./pawnHelper";
import { knightMove } from "./knightHelper";
import { bishopMove } from "./bishopHelper";

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
    return queenMove(board, piece, position);
  }

  if (piece.name === PieceNames.KING) {
    return kingMove(board, piece, position);
  }

  return [];
};

const moveHelper = (board: Cell[][], color:PieceColor, row: number, column: number) => {
  if (board[row][column].state === "empty") {
    return [true, false];
  }

  const isEnemy = (board[row][column].state as Piece).color !== color;

  if (isEnemy) {
    return [true, true];
  }

  return [false, true];
};

const queenMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const rookMoves = rookMove(board, piece, position);
  const bishopMoves = bishopMove(board, piece, position);

  return [...rookMoves, ...bishopMoves];
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

const kingMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const up = row + 1;
  const down = row - 1;
  const left = column - 1;
  const right = column + 1;

  const allDirections: [number, number, boolean][] = [
    [up, right, up < 8 && right < 8],
    [up, left, up < 8 && left > -1],
    [down, right, down > -1 && right < 8],
    [down, left, down > -1 && left > -1],

    [up, column, up < 8],
    [down, column, down > -1],
    [row, left, left > -1],
    [row, right, right < 8],
  ];
  
  allDirections.forEach(([v, h, canMove]) => {  
    if (canMove) {
      const isEmpty = board[v][h].state === "empty";
      const isEnemy = (board[v][h].state as Piece).color !== piece.color;

      if (isEmpty || isEnemy) {
        result.push([v, h]);
      }
    }
  });

  return result;
};