import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";

export const calculatePossibleMoves = (board: Cell[][], selected: Cell): CellIndex[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.PAWN) {
    return pawnMove(board, piece, position);
  }

  if (piece.name === PieceNames.KNIGHT) {
    return knightMove(board, piece, position);
  }

  const a = 1;
  
  return [];
};

const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const p1 = piece.color === "white" ? 1 : -1;
  const p2 = piece.color === "white" ? 2 : -2;

  const r1 = row + p1;
  const r2 = row + p2;

  if (board[r1][column].state === "empty") {
    result.push([r1, column]);
  }

  if (board[r2][column].state === "empty") {
    result.push([r2, column]);
  }
  
  return result;
};

const knightMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const vUp2 = row + 2;
  const vUp1 = row + 1;
  const vD2 = row - 2;
  const vD1 = row - 1;
  
  const hR2 = column + 2;
  const hR1 = column + 1;
  const hL2 = column - 2;
  const hL1 = column - 1;
  
  const coordindates: [number, number, boolean][] = [
    [vUp2, hL1, vUp2 < 8 && hL1 > -1],
    [vUp2, hR1, vUp2 < 8 && hR1 < 8],
    [vD2, hL1, vD2 > -1 && hL1 > -1],
    [vD2, hR1, vD2 > -1 && hR1 < 8],
    [vUp1, hL2, vUp1 < 8 && hL2 > -1],
    [vUp1, hR2, vUp1 < 8 && hR2 < 8],
    [vD1, hL2, vD1 > -1 && hL2 > -1],
    [vD1, hR2, vD1 > -1 && hR2 < 8],
  ];

  coordindates.forEach(([v, h, condition]) => {
    if (condition && board[v][h].state === "empty") {
      result.push([v, h]); 
    }
  });
  
  return result;
};