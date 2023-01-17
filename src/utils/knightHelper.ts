import { Cell, Piece, CellIndex } from "../types/types";

export const knightMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
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
  
  const allDirections: [number, number, boolean][] = [
    [vUp2, hL1, vUp2 < 8 && hL1 > -1],
    [vUp2, hR1, vUp2 < 8 && hR1 < 8],
    [vD2, hL1, vD2 > -1 && hL1 > -1],
    [vD2, hR1, vD2 > -1 && hR1 < 8],
    [vUp1, hL2, vUp1 < 8 && hL2 > -1],
    [vUp1, hR2, vUp1 < 8 && hR2 < 8],
    [vD1, hL2, vD1 > -1 && hL2 > -1],
    [vD1, hR2, vD1 > -1 && hR2 < 8],
  ];

  allDirections.forEach(([v, h, canMove]) => {
    if (canMove) {
      const isEmpty = board[v][h].state === "empty";
      const isEnemy = (board[v][h].state as Piece).color !== piece.color;

      if (isEmpty || isEnemy) {
        isEnemy && result.push([v, h]);
      }
    }
  });
  
  return result;
};