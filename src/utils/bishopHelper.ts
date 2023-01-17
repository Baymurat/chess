import { Cell, Piece, PieceColor, PieceNames, CellIndex } from "../types/types";

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

export const canBishopReach = (board: Cell[][], bishopCell: Cell, targetCell: CellIndex): boolean => {
  const [bishopRow, bishopColumn] = bishopCell.index;
  const [targetRow, targetColumn] = targetCell;

  const isDifferentAxis = Math.abs(bishopRow - targetRow) !== Math.abs(bishopColumn - targetColumn);
  const isSamePostion = bishopRow === targetRow && bishopColumn === targetColumn;
  if (isDifferentAxis || isSamePostion) {
    return false;
  }

  const isRowUpper = bishopRow > targetRow;
  const isColumnUpper = bishopColumn > targetColumn;

  const [r1, c1, r2, c2, vInc, hInc] = isRowUpper ? 
    isColumnUpper 
      ? [targetRow, targetColumn, bishopRow, bishopColumn, 1, 1] 
      : [bishopRow, bishopColumn, targetRow, targetColumn, -1, 1]
    : isColumnUpper 
      ? [targetRow, targetColumn, bishopRow, bishopColumn, -1, 1] 
      : [bishopRow, bishopColumn, targetRow, targetColumn, 1, 1]; 
    

  for (let i = r1 + vInc, j = c1 + hInc; j < c2; i += vInc, j += hInc) {
    const isEmpty = board[i][j].state === "empty"; 
    const isKing = (board[i][j].state as Piece).name === PieceNames.KING;
    const isAlly = (board[i][j].state as Piece).color === (bishopCell.state as Piece).color;

    if ((!isEmpty && !isKing) || (isKing && isAlly)) {
      return false;
    }
  }

  return true;
};