import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";

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

export const rookMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  // TO RIGHT
  for (let i = column + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      result.push([row, i]);
    }

    if (isBreak) {
      break;
    }
  }

  // TO LEFT
  for (let i = column - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      result.push([row, i]);
    }

    if (isBreak) {
      break;
    }
  }

  // UP
  for (let i = row + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      result.push([i, column]);
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN
  for (let i = row - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      result.push([i, column]);
    }

    if (isBreak) {
      break;
    }
  }

  return result;
};

export const canRookReach = (board: Cell[][], rookCell: Cell, targetCell: CellIndex): boolean => {
  const [rookRow, rookColumn] = rookCell.index;
  const [targetRow, targetColumn] = targetCell;

  const isDifferentAxis = rookRow !== targetRow && rookColumn !== targetColumn;
  const isSamePosition = rookRow === targetRow && rookColumn === targetColumn;
  if (isDifferentAxis || isSamePosition) {
    return false;
  }

  const [fromRow, toRow] = targetRow < rookRow ? [targetRow, rookRow] : [rookRow, targetRow];
  const [fromColumn, toColumn] = targetColumn < rookColumn ? [targetColumn, rookColumn] : [rookColumn, targetColumn];

  if (rookRow === targetRow) {
    for (let i = fromColumn + 1; i < toColumn; i++) {
      const isEmpty = board[rookRow][i].state === "empty"; 
      const isKing = (board[rookRow][i].state as Piece).name === PieceNames.KING;
      const isAlly = (board[rookRow][i].state as Piece).color === (rookCell.state as Piece).color;

      if ((!isEmpty && !isKing) || (isKing && isAlly)) {
        return false;
      }
    }
  } else {
    for (let i = fromRow + 1; i < toRow; i++) {
      const isEmpty = board[i][rookColumn].state === "empty"; 
      const isKing = (board[i][rookColumn].state as Piece).name === PieceNames.KING;
      const isAlly = (board[i][rookColumn].state as Piece).color === (rookCell.state as Piece).color;

      if ((!isEmpty && !isKing) || (isKing && isAlly)) {
        return false;
      }
    }
  }

  return true;
};