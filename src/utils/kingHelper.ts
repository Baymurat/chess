import { Cell, Piece, CellIndex } from "../types/types";

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
