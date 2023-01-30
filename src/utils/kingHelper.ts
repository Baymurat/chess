import { Cell, CellIndex, Piece, PieceColor, PieceNames, ReachableCell } from "../types/types";
import { copyBoard, getAllies,movePieceTo } from "./commonHelper";
import { getKnightDirections } from "./knightHelper";
import { getPawnAttackPositions } from "./pawnHelper";
import { calculateReachableCells } from "./possibleMoves";

const getKingDirections = (position: CellIndex): CellIndex[] => {
  const [row, column] = position;

  const up = row + 1;
  const down = row - 1;
  const left = column - 1;
  const right = column + 1;

  const allDirections: [number, number, boolean][] = [
    [up, right, up < 8 && right < 8],
    [up, left, up < 8 && left > -1],
    [down, right, down > -1 && right < 8],
    [down, left, down > -1 && left > -1],

    [up, column, up < 8],
    [down, column, down > -1],
    [row, left, left > -1],
    [row, right, right < 8],
  ];

  return allDirections.filter(([,,canMove]) => canMove).map(([r, c]) => ([r, c]));
};

export const hasEscapeCell = (board: Cell[][], color: PieceColor): boolean => {
  const position = getKingPosition(board, color);
  const reachableCells = kingMove(board, color, position);
  const escapeCellIndex = reachableCells.findIndex((cell) => cell.isPossibleMove && !cell.isForbiddenForKing);

  return escapeCellIndex !== -1;
};

export const canAlliesSaveKing = (board: Cell[][], color: PieceColor): boolean => {
  const allies = getAllies(board, color);

  for (let i = 0; i < allies.length; i++) {
    const moveCells = calculateReachableCells(board, allies[i]);
    const saveCell = moveCells.findIndex((cell) => cell.isPossibleMove);

    if (saveCell !== -1) {
      return true;
    }
  }

  return false;
};

export const kingMove = (board: Cell[][], color: PieceColor, position: CellIndex): ReachableCell[] => {
  const result: ReachableCell[] = [];

  getKingDirections(position).forEach(([v, h]) => {
    const isEmpty = board[v][h].state === "empty";
    const isEnemy = (board[v][h].state as Piece).color !== color;
    const draftBoard = copyBoard(board);

    const to: CellIndex = [v, h];

    if (isEmpty || isEnemy) {
      const isPossibleMove = !isKingInDanger(movePieceTo(draftBoard, position, to), to);
      result.push({
        index: [v, h],
        isForbiddenForKing: !isPossibleMove,
        isPossibleMove,
      });
    }
  });

  return result;
};

const kingMoveHelper = (cell: Cell, myColor: PieceColor, alongAxis: boolean): [boolean, boolean] => {
  if (cell.state === "empty") {
    return [false, false];
  }

  const isEnemy = cell.state.color !== myColor;

  if (isEnemy) {
    const isQueen = cell.state.name === PieceNames.QUEEN;
    const isRook = alongAxis && cell.state.name === PieceNames.ROOK;
    const isBishop = !alongAxis && cell.state.name === PieceNames.BISHOP;

    if (isQueen || isRook || isBishop) {
      return [true, true];
    }
  }

  return [false, true];
};

const isDangerPath = (
  condition: (counter: number) => boolean,
  callBack: (counter: number) => [boolean, boolean]
): boolean => {
  for (let counter = 1; condition(counter); counter++) {
    const [inDanger, isBreak] = callBack(counter);

    if (inDanger) {
      return true;
    }

    if (isBreak) {
      break;
    }
  }

  return false;
};

const threatFromPawn = (board: Cell[][], index: CellIndex, color: PieceColor): boolean => {
  const pawns = getPawnAttackPositions(index, color);

  for (let i = 0; i < pawns.length; i++) {
    const [row, column] = pawns[i];
    const cell = board[row][column].state;

    if (cell !== "empty" && cell.name === PieceNames.PAWN && cell.color !== color) {
      return true;
    }
  }

  return false;
};

const threatFromKing = (board: Cell[][], index: CellIndex, color: PieceColor): boolean => {
  const enemyPositions = getKingDirections(index);

  for(let i = 0; i < enemyPositions.length; i++) {
    const [row, column] = enemyPositions[i];
    const cell = board[row][column].state;

    if (cell !== "empty" && cell.name === PieceNames.KING && cell.color !== color) {
      return true;
    }
  }

  return false;
};

const threatFromKnight = (board: Cell[][], index: CellIndex, color: PieceColor): boolean => {
  const enemyPositions = getKnightDirections(index);

  for (let i = 0; i < enemyPositions.length; i++) {
    const [row, column] = enemyPositions[i];
    const cell = board[row][column].state;

    if (cell !== "empty" && cell.name === PieceNames.KNIGHT && cell.color !== color) {
      return true;
    }
  }

  return false;
};
export const isKingInDanger = (board: Cell[][], kingPosition: CellIndex): boolean => {
  const [row, column] = kingPosition;
  if (row === -1) {
    return false;
  }

  const color = (board[row][column].state as Piece).color;

  // Move up (vertical direction)
  if (isDangerPath(
    (counter) => (row + counter) < 8,
    (counter) => kingMoveHelper(board[row + counter][column], color, true)
  )) {
    return true;
  }

  // Move down (vertical direction)
  if (isDangerPath(
    (counter) => (row - counter) > -1,
    (counter) => kingMoveHelper(board[row - counter][column], color, true)
  )) {
    return true;
  }

  // Move to the right (horizontal direction)
  if (isDangerPath(
    (counter) => (column + counter) < 8,
    (counter) => kingMoveHelper(board[row][column + counter], color, true)
  )) {
    return true;
  }

  // Move to the left (horizontal direction)
  if (isDangerPath(
    (counter) => (column - counter) > -1,
    (counter) => kingMoveHelper(board[row][column - counter], color, true)
  )) {
    return true;
  }

  // Move up right (diagonal directions)
  if (isDangerPath(
    (counter) => row + counter < 8 && column + counter < 8,
    (counter) => kingMoveHelper(board[row + counter][column + counter], color, false)
  )) {
    return true;
  }

  // Move down right (diagonal directions)
  if (isDangerPath(
    (counter) => row - counter > -1 && column + counter < 8,
    (counter) => kingMoveHelper(board[row - counter][column + counter], color, false)
  )) {
    return true;
  }

  // Move down left (diagonal directions)
  if (isDangerPath(
    (counter) => row - counter > -1 && column - counter > -1,
    (counter) => kingMoveHelper(board[row - counter][column - counter], color, false)
  )) {
    return true;
  }

  // Move up left (diagonal directions)
  if (isDangerPath(
    (counter) => row + counter < 8 && column - counter > -1,
    (counter) => kingMoveHelper(board[row + counter][column - counter], color, false)
  )) {
    return true;
  }

  if (threatFromPawn(board, kingPosition, color)) {
    return true;
  }

  if (threatFromKing(board, kingPosition, color)) {
    return true;
  }

  if (threatFromKnight(board, kingPosition, color)) {
    return true;
  }

  return false;
};

export const getKingPosition = (board: Cell[][], color: PieceColor): CellIndex => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].state !== "empty"
          && (board[i][j].state as Piece).name === PieceNames.KING
          && (board[i][j].state as Piece).color === color) {
        return [i, j];
      }
    }
  }

  return [-1, -1];
};
