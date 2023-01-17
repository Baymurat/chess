import { Cell, Piece, CellIndex } from "../types/types";

export const kingMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

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
  
  allDirections.forEach(([v, h, canMove]) => {  
    if (canMove) {
      const isEmpty = board[v][h].state === "empty";
      const isEnemy = (board[v][h].state as Piece).color !== piece.color;

      if (isEmpty || isEnemy) {
        result.push([v, h]);
      }
    }
  });

  return result;
};