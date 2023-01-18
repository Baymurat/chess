import { Cell, Piece, CellIndex } from "../types/types";

export const canPawnReach = (board: Cell[][], pawnCell: Cell, targetCell: CellIndex): boolean => {
  const step = (pawnCell.state as Piece).color === "white" ? 1 : -1;
  const [pawnRow, pawnColumn] = pawnCell.index;
  const [targetRow, targetColumn] = targetCell;

  if (pawnRow + step === targetRow && (pawnColumn - 1 === targetColumn || pawnColumn + 1 === targetColumn)) {
    return true;
  }

  return false;
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