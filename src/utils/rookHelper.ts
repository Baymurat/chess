import { Cell, CellIndex, Piece, PieceColor, ReachableCell } from "../types/types";
import { copyBoard,movePieceTo } from "./commonHelper";
import { getKingPosition, isKingInDanger } from "./kingHelper";

const rookMoveHelper = (cell: Cell, color: PieceColor) => {
  if (cell.state === "empty") {
    return [true, false];
  }

  const isEnemy = cell.state.color !== color;

  if (isEnemy) {
    return [true, true];
  }

  return [false, true];
};

export const rookMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const [row, column] = position;
  const kingPosition = getKingPosition(board, piece.color);

  const result: ReachableCell[] = [];

  // TO RIGHT
  let draftBoard = copyBoard(board);
  for (let i = column + 1; i < 8; i++) {
    const [isAdd, isBreak] = rookMoveHelper(board[row][i], piece.color);

    if (isAdd) {
      const from: CellIndex = [row, i - 1];
      const to: CellIndex = [row, i];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), kingPosition);
      result.push({ index: [row, i], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // TO LEFT
  draftBoard = copyBoard(board);
  for (let i = column - 1; i > -1; i--) {
    const [isAdd, isBreak] = rookMoveHelper(board[row][i], piece.color);

    if (isAdd) {
      const from: CellIndex = [row, i + 1];
      const to: CellIndex = [row, i];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), kingPosition);
      result.push({ index: [row, i], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // UP
  draftBoard = copyBoard(board);
  for (let i = row + 1; i < 8; i++) {
    const [isAdd, isBreak] = rookMoveHelper(board[i][column], piece.color);

    if (isAdd) {
      const from: CellIndex = [i - 1, column];
      const to: CellIndex = [i, column];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), kingPosition);
      result.push({ index: [i, column], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN
  draftBoard = copyBoard(board);
  for (let i = row - 1; i > -1; i--) {
    const [isAdd, isBreak] = rookMoveHelper(board[i][column], piece.color);

    if (isAdd) {
      const from: CellIndex = [i + 1, column];
      const to: CellIndex = [i, column];
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, from, to), kingPosition);
      result.push({ index: [i, column], isPossibleMove });
    }

    if (isBreak) {
      break;
    }
  }

  return result;
};
