import { Cell, Piece, PieceNames, PieceColor, CellIndex, ReachableCell } from "../types/types";
import { getKingPosition, copyBoard, isKingInDanger, movePieceTo } from "./kingHelper"; 

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

export const rookMove2 = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const [row, column] = position;
  const [kingRow, kingColumn] = getKingPosition(board, piece.color);

  const result: ReachableCell[] = [];
  
  // TO RIGHT
  let draftBoard = copyBoard(board);
  for (let i = column + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      const from: CellIndex = [row, i - 1];
      const to: CellIndex = [row, i];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [row, i], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // TO LEFT
  draftBoard = copyBoard(board);
  for (let i = column - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      const from: CellIndex = [row, i + 1];
      const to: CellIndex = [row, i];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [row, i], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // UP
  draftBoard = copyBoard(board);
  for (let i = row + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      const from: CellIndex = [i - 1, column];
      const to: CellIndex = [i, column];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, column], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN
  draftBoard = copyBoard(board);
  for (let i = row - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      const from: CellIndex = [i + 1, column];
      const to: CellIndex = [i, column];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, column], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  return result;
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