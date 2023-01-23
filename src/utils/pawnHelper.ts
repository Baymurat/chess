import { Cell, Piece, CellIndex, ReachableCell, PieceColor } from "../types/types";
import { getKingPosition, isKingInDanger } from "./kingHelper"; 
import { movePieceTo, copyBoard } from "./commonHelper";

export const getPawnAttackPositions = (position: CellIndex, color: PieceColor): CellIndex[] => {
  const [row, column] = position;

  const isWhite = color === "white";

  const up = row + 1;
  const down = row - 1;
  const left = column - 1;
  const right = column + 1;

  const allDirections: [number, number, boolean][] = [
    [up, right, isWhite && up < 8 && right < 8],
    [down, right, !isWhite && down > -1 && right < 8],
    [down, left, !isWhite && down > -1 && left > -1],
    [up, left, isWhite && up < 8 && left > -1]
  ];
  
  const result: CellIndex[] = allDirections
    .filter(([,, condition]) => condition)
    .map(([v, h]) => [v, h]);

  return result;
};

export const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
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
      const isP2 = !isKingInDanger(movePieceTo(draftBoard, to1, to2), [kingRow, kingColumn]);
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
