import { Cell, PieceNames } from "../types/types";

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

const swap = (cell: Cell): string => {
  if (cell.state === "empty") {
    return "*";
  }

  const color = cell.state.color === "white" ? "W" : "B";

  if (cell.state.name === PieceNames.PAWN) {
    return `P-${color}`;
  }

  if (cell.state.name === PieceNames.ROOK) {
    return `R-${color}`;
  }

  if (cell.state.name === PieceNames.BISHOP) {
    return `B-${color}`;
  }

  if (cell.state.name === PieceNames.KNIGHT) {
    return `KN-${color}`;
  }

  if (cell.state.name === PieceNames.KING) {
    return `KN-${color}`;
  }

  if (cell.state.name === PieceNames.QUEEN) {
    return `Q-${color}`;
  }

  return "";
};

export const printBoard = (board: Cell[][]): void => {
  board.forEach((row) => {
    const str = row.reduce((acc, curr) => (acc + ` '${swap(curr)}'`), "");
    console.log(str);
  });

  console.log("______________________");
};