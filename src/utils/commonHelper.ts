import { Cell, CellIndex, PieceColor, PieceNames } from "../types/types";

export const copyBoard = (board: Cell[][]): Cell[][] => {
  const result: Cell[][] = [];

  for (let i = 0; i < 8; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 8; j++) {
      row.push({ ...board[i][j] });
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

export const getAllies = (board: Cell[][], color: PieceColor): Cell[] => {
  const result: Cell[] = [];
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.state !== "empty" && cell.state.color === color) {
        result.push(cell);
      }
    });
  });

  return result;
};

export const printBoard = (board: Cell[][]): void => {
  copyBoard(board)
    .reverse()
    .forEach((row, i) => {
      const str = row.reduce((acc, curr) => (`${acc} '${swap(curr)}'`), "");
      console.log(i, str);
    });

  console.log("______________________");
};
