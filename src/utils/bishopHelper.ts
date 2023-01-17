import { Cell, Piece, PieceColor, CellIndex } from "../types/types";

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

export const bishopMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  // UP RIGHT
  for (let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      result.push([i, j]);
    }

    if (isBreak) {
      break;
    }
  }

  // UP LEFT
  for (let i = row + 1, j = column - 1; i < 8 && j > -1; i++, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
  
    if (isAdd) {
      result.push([i, j]);
    }

    if (isBreak) {
      break;
    }
  }
    
  // DOWN LEFT
  for (let i = row - 1, j = column - 1; i > -1 && j > -1; i--, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
    
    if (isAdd) {
      result.push([i, j]);
    }
  
    if (isBreak) {
      break;
    }
  }
    
  // DOWN RIGHT
  for (let i = row - 1, j = column + 1; i > -1 && j < 8; i--, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
      
    if (isAdd) {
      result.push([i, j]);
    }
    
    if (isBreak) {
      break;
    }
  }
    
  return result;
};