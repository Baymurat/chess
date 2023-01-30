import { Cell, CellIndex, CellState, Piece, PieceColor, PieceNames,ReachableCell } from "../types/types";
import { copyBoard,movePieceTo } from "./commonHelper";
import { getKingPosition, isKingInDanger } from "./kingHelper";

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

const getPawnMovePositions = (position: CellIndex, color: PieceColor): CellIndex[] => {
  const [row, column] = position;

  const isWhite = color === "white";

  const step1 = isWhite ? 1 : -1;
  const step2 = isWhite ? 2 : -2;
  const r1 = row + step1;
  const r2 = row + step2;

  const result: CellIndex[] = [[r1, column]];

  if ((isWhite && row === 1) || (!isWhite && row === 6)) {
    result.push([r2, column]);
  }

  return result;
};

export const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const kingPosition = getKingPosition(board, piece.color);

  const result: ReachableCell[] = [];
  const movePositions = getPawnMovePositions(position, piece.color);
  const attackPositions = getPawnAttackPositions(position, piece.color);

  for (let i = 0; i < movePositions.length; i++) {
    const [row, column] = movePositions[i];
    const cell = board[row][column].state;

    if (cell === "empty") {
      const draftBoard = copyBoard(board);
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, position, [row, column]), kingPosition);
      result.push({ index: [row, column], isPossibleMove });
    } else {
      break;
    }
  }

  for (let i = 0; i < attackPositions.length; i++) {
    const [row, column] = attackPositions[i];
    const cell = board[row][column].state;

    if (cell !== "empty" && cell.color !== piece.color) {
      const draftBoard = copyBoard(board);
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, position, [row, column]), kingPosition);
      result.push({ index: [row, column], isPossibleMove });
    }
  }

  return result;
};

export const isPawnPromoteable = (piece: CellState, index: CellIndex): boolean => {
  if (piece !== "empty") {
    const [row] = index;
    const isWhitePawn = piece.name === PieceNames.PAWN && piece.color === "white";
    const isBlackPawn = piece.name === PieceNames.PAWN && piece.color === "black";

    if (isWhitePawn && row === 7) {
      return true;
    }

    if (isBlackPawn && row === 0) {
      return true;
    }
  }

  return false;
};