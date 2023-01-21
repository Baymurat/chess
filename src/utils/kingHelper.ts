import { Cell, Piece, CellIndex, PieceColor, PieceNames } from "../types/types";

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

export const kingMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const result: CellIndex[] = [];

  getKingDirections(position).forEach(([v, h]) => {  
    const isEmpty = board[v][h].state === "empty";
    const isEnemy = (board[v][h].state as Piece).color !== piece.color;

    if (isEmpty || isEnemy) {
      result.push([v, h]);
    }
  });

  return result;
};


export const canKingReach = (board: Cell[][], kingCell: Cell, targetCell: CellIndex): boolean => {
  const [row, column] = targetCell;
  return getKingDirections(kingCell.index).findIndex(([r, c]) => r === row && c === column) !== -1;
};

const moveHelper = (cell: Cell, myColor: PieceColor) => {
  if (cell.state === "empty") {
    return [false, false];
  }

  const isEnemy = cell.state.color !== myColor;
  return isEnemy ? [true, true] : [false, true];
};

export const isKingInDanger = (board: Cell[][], kingPosition: CellIndex): boolean => {
  const [row, column] = kingPosition;
  if (row === -1) {
    return false;
  }

  const color = (board[row][column].state as Piece).color;

  for (let i = row + 1; i < 8; i++) {
    const [inDanger, isBreak] = moveHelper(board[i][column], color);

    if (inDanger) {
      return true;
    }

    if (isBreak) {
      break;
    }
  }

  for (let i = row - 1; i > -1; i--) {
    const [inDanger, isBreak] = moveHelper(board[i][column], color);

    if (inDanger) {
      return true;
    }

    if (isBreak) {
      break;
    }
  }

  for (let i = column + 1; i < 8; i++) {
    const [inDanger, isBreak] = moveHelper(board[row][i], color);

    if (inDanger) {
      return true;
    }

    if (isBreak) {
      break;
    }
  }

  for (let i = column - 1; i > -1; i--) {
    const [inDanger, isBreak] = moveHelper(board[row][i], color);

    if (inDanger) {
      return true;
    }

    if (isBreak) {
      break;
    }
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

export const copyBoard = (board: Cell[][]): Cell[][] => {
  const result: Cell[][] = [];

  for (let i = 0; i < 8; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 8; j++) {
      row.push({...board[i][j]});
    }
    result.push(row);
  }

  return result;
};

export const movePieceTo = (board: Cell[][], from: CellIndex, to: CellIndex): Cell[][] => {
  const [fromRow, fromColumn] = from;
  const [toRow, toColumn] = to;

  const isValidFrom = (fromRow < 8 && fromRow > -1) && (toRow < 8 && toRow > -1);
  const isVaidTo = (toRow < 8 && toRow > -1) && (toColumn < 8 && toColumn > -1);

  if (isVaidTo && isValidFrom) {
    board[toRow][toColumn].state = board[fromRow][fromColumn].state;
    board[fromRow][fromColumn].state = "empty";
  }

  return board;
};