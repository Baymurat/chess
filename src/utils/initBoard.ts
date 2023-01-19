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

export const generateBoard = (): Cell[][] => {
  let board: Cell[][] = [];
  board = createEmptyBoard();
  board = initOfficers(board, "white");
  board = initOfficers(board, "black");
  board = initPawns(board, "white");
  board = initPawns(board, "black");

  return board; 
};