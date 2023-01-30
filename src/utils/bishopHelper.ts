import { Cell, CellIndex, Piece, PieceColor, ReachableCell } from "../types/types";
import { copyBoard, movePieceTo } from "./commonHelper";
import { getKingPosition, isKingInDanger } from "./kingHelper";


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

export const bishopMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const [row, column] = position;
  const [kingRow, kingColumn] = getKingPosition(board, piece.color);

  const result: ReachableCell[] = [];

  // UP RIGHT
  let draftBoard = copyBoard(board);
  for (let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      const from: CellIndex = [i - 1, j - 1];
      const to: CellIndex = [i, j];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, j], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // UP LEFT
  draftBoard = copyBoard(board);
  for (let i = row + 1, j = column - 1; i < 8 && j > -1; i++, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      const from: CellIndex = [i - 1, j + 1];
      const to: CellIndex = [i, j];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, j], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN LEFT
  draftBoard = copyBoard(board);
  for (let i = row - 1, j = column - 1; i > -1 && j > -1; i--, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      const from: CellIndex = [i + 1, j + 1];
      const to: CellIndex = [i, j];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, j], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN RIGHT
  draftBoard = copyBoard(board);
  for (let i = row - 1, j = column + 1; i > -1 && j < 8; i--, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      const from: CellIndex = [i + 1, j - 1];
      const to: CellIndex = [i, j];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), [kingRow, kingColumn]);
      result.push({ index: [i, j], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  return result;
};
