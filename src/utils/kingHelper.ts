import { Cell, Piece, CellIndex, PieceColor, PieceNames, ReachableCell } from "../types/types";
import { movePieceTo } from "./commonHelper";

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

export const kingMove = (board: Cell[][], piece: Piece, position: CellIndex): ReachableCell[] => {
  const result: ReachableCell[] = [];

  getKingDirections(position).forEach(([v, h]) => {  
    const isEmpty = board[v][h].state === "empty";
    const isEnemy = (board[v][h].state as Piece).color !== piece.color;
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

const moveHelper = (cell: Cell, myColor: PieceColor, throughAxis: boolean): [boolean, boolean] => {
  if (cell.state === "empty") {
    return [false, false];
  }

  const isEnemy = cell.state.color !== myColor;

  if (isEnemy) {
    const isQueen = cell.state.name === PieceNames.QUEEN;
    const isRook = throughAxis && cell.state.name === PieceNames.ROOK;
    const isBishop = !throughAxis && cell.state.name === PieceNames.BISHOP;

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

const getEnemyPawnsPositions = (index: CellIndex, color: PieceColor): CellIndex[] => {
  const [row, column] = index;

  const isWhite = color === "white";

  const up = row + 1;
  const down = row - 1;
  const left = column - 1;
  const right = column + 1;

  const allDirections: [number, number, boolean][] = [
    [up, right, isWhite && up < 8 && right < 8],
    [down, right, !isWhite && down > -1 && right < 8],
    [down, left, !isWhite && down > -1 && left > -1],
    [up, left, isWhite && up < 8 && left > -1]
  ];
  
  const result: CellIndex[] = allDirections
    .filter(([,, condition]) => condition)
    .map(([v, h]) => [v, h]);

  return result;
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
    (counter) => moveHelper(board[row + counter][column], color, true)
  )) {
    return true;
  }

  // Move down (vertical direction)
  if (isDangerPath(
    (counter) => (row - counter) > -1,
    (counter) => moveHelper(board[row - counter][column], color, true)
  )) {
    return true;
  }
  
  // Move to the right (horizontal direction)
  if (isDangerPath(
    (counter) => (column + counter) < 8,
    (counter) => moveHelper(board[row][column + counter], color, true)
  )) {
    return true;
  }

  // Move to the left (horizontal direction)
  if (isDangerPath(
    (counter) => (column - counter) > -1,
    (counter) => moveHelper(board[row][column - counter], color, true)
  )) {
    return true;
  }

  // Move up right (diagonal directions)
  if (isDangerPath(
    (counter) => row + counter < 8 && column + counter < 8,
    (counter) => moveHelper(board[row + counter][column + counter], color, false)
  )) {
    return true;
  }

  // Move down right (diagonal directions)
  if (isDangerPath(
    (counter) => row - counter > -1 && column + counter < 8,
    (counter) => moveHelper(board[row - counter][column + counter], color, false)
  )) {
    return true;
  }

  // Move down left (diagonal directions)
  if (isDangerPath(
    (counter) => row - counter > -1 && column - counter > -1,
    (counter) => moveHelper(board[row - counter][column - counter], color, false)
  )) {
    return true;
  }

  // Move up left (diagonal directions)
  if (isDangerPath(
    (counter) => row + counter < 8 && column - counter > -1,
    (counter) => moveHelper(board[row + counter][column - counter], color, false)
  )) {
    return true;
  }

  const pawns = getEnemyPawnsPositions(kingPosition, color);

  for (let i = 0; i < pawns.length; i++) {
    const [pR, pC] = pawns[i];
    const cell = board[pR][pC].state;

    if (cell !== "empty" && cell.name === PieceNames.PAWN && cell.color !== color) {
      return true;
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

// export const movePieceTo = (board: Cell[][], from: CellIndex, to: CellIndex): Cell[][] => {
//   const [fromRow, fromColumn] = from;
//   const [toRow, toColumn] = to;

//   const isValidFrom = (fromRow < 8 && fromRow > -1) && (toRow < 8 && toRow > -1);
//   const isVaidTo = (toRow < 8 && toRow > -1) && (toColumn < 8 && toColumn > -1);

//   if (isVaidTo && isValidFrom) {
//     board[toRow][toColumn].state = board[fromRow][fromColumn].state;
//     board[fromRow][fromColumn].state = "empty";
//   }

//   return board;
// };