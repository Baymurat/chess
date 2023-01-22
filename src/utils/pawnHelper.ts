import { Cell, Piece, CellIndex, ReachableCell } from "../types/types";
import { getKingPosition, copyBoard, isKingInDanger, movePieceTo } from "./kingHelper"; 

export const canPawnReach = (board: Cell[][], pawnCell: Cell, targetCell: CellIndex): boolean => {
  const step = (pawnCell.state as Piece).color === "white" ? 1 : -1;
  const [pawnRow, pawnColumn] = pawnCell.index;
  const [targetRow, targetColumn] = targetCell;

  if (pawnRow + step === targetRow && (pawnColumn - 1 === targetColumn || pawnColumn + 1 === targetColumn)) {
    return true;
  }

  return false;
};

export const pawnMove2 = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const [row, column] = position;
  const [kingRow, kingColumn] = getKingPosition(board, piece.color);

  const result: ReachableCell[] = [];

  const isWhite = piece.color === "white";
  const step1 = isWhite ? 1 : -1;
  const step2 = isWhite ? 2 : -2;
  const r1 = row + step1;
  const r2 = row + step2;

  const from: CellIndex = [row, column];

  let draftBoard = copyBoard(board);
  if (board[r1][column].state === "empty") {
    const to1: CellIndex = [r1, column];
    const isP1 = !isKingInDanger(movePieceTo(draftBoard, from, to1), [kingRow, kingColumn]);
    result.push({ index: [r1, column], isPossibleMove: isP1 });

    const isStart = isWhite ? row === 1 : row === 6;
    if (isStart && board[r2][column].state === "empty") {
      const to2: CellIndex = [r2, column];
      const isP2 = !isKingInDanger(movePieceTo(draftBoard, from, to2), [kingRow, kingColumn]);
      result.push({ index: [r2, column], isPossibleMove: isP2 });
    }
  }

  draftBoard = copyBoard(board);
  if (column + 1 < 8) {
    const isLeftEnemy = (
      board[r1][column + 1].state !== "empty" 
      && (board[r1][column + 1].state as Piece).color !== piece.color
    );

    if (isLeftEnemy) {
      const to3: CellIndex = [r1, column + 1];
      const isP3 = !isKingInDanger(movePieceTo(draftBoard, from, to3), [kingRow, kingColumn]);
      result.push({ index: [r1, column + 1], isPossibleMove: isP3 });
    }
  }

  draftBoard = copyBoard(board);
  if (column - 1 > -1) {
    const isRightEnemy = (
      board[r1][column -1].state !== "empty" 
      && (board[r1][column - 1].state as Piece).color !== piece.color
    );

    if (isRightEnemy) {
      const to4: CellIndex = [r1, column - 1];
      const isP4 = !isKingInDanger(movePieceTo(draftBoard, from, to4), [kingRow, kingColumn]);
      result.push({ index: [r1, column - 1], isPossibleMove: isP4 });
    }

  }

  return result;
};

export const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const isWhite = piece.color === "white";
  const step1 = isWhite ? 1 : -1;
  const step2 = isWhite ? 2 : -2;
  const r1 = row + step1;
  const r2 = row + step2;

  if (board[r1][column].state === "empty") {
    result.push([r1, column]);

    const isStart = isWhite ? row === 1 : row === 6;
    if (isStart && board[r2][column].state === "empty") {
      result.push([r2, column]);
    }
  }

  if (column + 1 < 8) {
    const isLeftEnemy = (
      board[r1][column + 1].state !== "empty" 
      && (board[r1][column + 1].state as Piece).color !== piece.color
    );

    if (isLeftEnemy) {
      result.push([r1, column + 1]);
    }
  }

  if (column - 1 > -1) {
    const isRightEnemy = (
      board[r1][column -1].state !== "empty" 
      && (board[r1][column - 1].state as Piece).color !== piece.color
    );

    if (isRightEnemy) {
      result.push([r1, column - 1]);
    }

  }

  return result;
};