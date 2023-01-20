import { of } from "rxjs";
import { map } from "rxjs/operators";
import { Piece, Cell, CellIndex, PieceColor } from "../types/types";
import { PieceNames } from "../types/types";

const createEmptyBoard = (): Cell[][] => {
  const arr: Cell[][] = [];

  for (let i = 0; i < 8; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 8; j++) {
      row.push(createCell("empty", [i, j], (i + j + 1) % 2 === 0));
    }
    arr.push(row);
  }

  return arr;
};

const copyBoard = (board: Cell[][]): Cell[][] => {
  const copy: Cell[][] = [];

  for (let i = 0; i < 8; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 8; j++) {
      row.push({...board[i][j]});
    }
    copy.push(row);
  }

  return copy;
};

const createCell = (state: "empty" | Piece , index: CellIndex, isWhite: boolean): Cell => ({
  isPossibleMove: false,
  isImpossibleMove: false,
  isSelected: false,
  isReachableCell: false,
  index,
  state,
  isWhite,
});

const buildPiece = (name: PieceNames, color: PieceColor): Piece => {
  if (name === PieceNames.QUEEN) {
    return { name, color };
  }

  if (name === PieceNames.KING) {
    return { name, color };
  }

  if (name === PieceNames.KNIGHT) {
    return { name, color };
  }

  if (name === PieceNames.ROOK) {
    return { name, color };
  }

  if (name === PieceNames.BISHOP) {
    return { name, color };
  }

  return { name, color };
};

const initOfficers = (board: Cell[][], color: PieceColor): Cell[][] => {
  const copy: Cell[][] = copyBoard(board);

  if (color === "white") {
    copy[0][0].state = buildPiece(PieceNames.ROOK, "white");
    copy[0][7].state = buildPiece(PieceNames.ROOK, "white");
    copy[0][1].state = buildPiece(PieceNames.KNIGHT, "white");
    copy[0][6].state = buildPiece(PieceNames.KNIGHT, "white");
    copy[0][2].state = buildPiece(PieceNames.BISHOP, "white");
    copy[0][5].state = buildPiece(PieceNames.BISHOP, "white");
    copy[0][3].state = buildPiece(PieceNames.QUEEN, "white");
    copy[0][4].state = buildPiece(PieceNames.KING, "white");
  } else {
    copy[7][0].state = buildPiece(PieceNames.ROOK, "black");  
    copy[7][7].state = buildPiece(PieceNames.ROOK, "black");  
    copy[7][1].state = buildPiece(PieceNames.KNIGHT, "black");
    copy[7][6].state = buildPiece(PieceNames.KNIGHT, "black");
    copy[7][2].state = buildPiece(PieceNames.BISHOP, "black");
    copy[7][5].state = buildPiece(PieceNames.BISHOP, "black");
    copy[7][4].state = buildPiece(PieceNames.KING, "black");
    copy[7][3].state = buildPiece(PieceNames.QUEEN, "black");
  }

  return copy;
};

const initPawns = (board: Cell[][], color: PieceColor): Cell[][] => {
  const copy = copyBoard(board);
  const dummy = new Array(8).fill("");
  
  if (color === "white") {
    dummy.forEach((e, i) => {
      copy[1][i].state = buildPiece(PieceNames.PAWN, color);
    });  
  } else {
    dummy.forEach((e, i) => {
      copy[6][i].state = buildPiece(PieceNames.PAWN, color);
    }); 
  }

  return copy;
};

const parseCell = (row: number) => (elem: string, index: number): Cell => {
  if (elem === "*") {
    return createCell("empty", [row, index], (row + index + 1) % 2 === 0);
  }

  const [p, c] = elem.split("-");
  const color: PieceColor = c === "W" ? "white" : "black";
  
  let name: PieceNames = PieceNames.PAWN;

  if (p === "Q") {
    name = PieceNames.QUEEN;
  }
  if (p === "KG") {
    name = PieceNames.KING;
  }
  if (p === "KN") {
    name = PieceNames.KNIGHT;
  }
  if (p === "R") {
    name = PieceNames.ROOK;
  }
  if (p === "B") {
    name = PieceNames.BISHOP;
  }

  const piece: Piece = buildPiece(name, color);
  const cell: Cell = createCell(piece, [row, index], (row + index + 1) % 2 === 0);

  return cell;
};

const generateTestBoard = (): Cell[][] => {
  const string_row1 = JSON.parse(process.env.ROW_1 || "");
  const string_row2 = JSON.parse(process.env.ROW_2 || "");
  const string_row3 = JSON.parse(process.env.ROW_3 || "");
  const string_row4 = JSON.parse(process.env.ROW_4 || "");
  const string_row5 = JSON.parse(process.env.ROW_5 || "");
  const string_row6 = JSON.parse(process.env.ROW_6 || "");
  const string_row7 = JSON.parse(process.env.ROW_7 || "");
  const string_row8 = JSON.parse(process.env.ROW_8 || "");

  const row1: Cell[] = string_row1.map(parseCell(0));
  const row2: Cell[] = string_row2.map(parseCell(1));
  const row3: Cell[] = string_row3.map(parseCell(2));
  const row4: Cell[] = string_row4.map(parseCell(3));
  const row5: Cell[] = string_row5.map(parseCell(4));
  const row6: Cell[] = string_row6.map(parseCell(5));
  const row7: Cell[] = string_row7.map(parseCell(6));
  const row8: Cell[] = string_row8.map(parseCell(7));

  const board: Cell[][] = [row1, row2, row3, row4, row5, row6, row7, row8];
  return board;
};

export const generateBoard = (): Cell[][] => {
  if (process.env.IS_TEST === "true") {
    return generateTestBoard();
  }

  let board: Cell[][] = [];

  of(createEmptyBoard()).pipe(
    map((board) => initOfficers(board, "white")),
    map((board) => initOfficers(board, "black")),
    map((board) => initPawns(board, "black")),
    map((board) => initPawns(board, "white")),
  ).subscribe((b) => (board = b));

  return board; 
};