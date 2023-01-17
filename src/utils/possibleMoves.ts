import { Cell, Piece, PieceNames, PieceColor, CellIndex } from "../types/types";

export const calculateImpossibleMoves = (board: Cell[][], piece: Piece, possibleMoves: CellIndex[]): CellIndex[] => {
  const result: CellIndex[] = [];
  const enemies = getEnemies(board, piece.color);

  for (let i = 0; i < possibleMoves.length; i++) {
    const [row, column] = possibleMoves[i];

    for (let j = 0; j < enemies.length; j++) {
      const enemyPiece = enemies[j].state as Piece;
      const [enemyRow, enemyColumn] = enemies[j].index;

      if (enemyPiece.name === PieceNames.ROOK) {
        if (enemyRow !== row && enemyColumn !== column) {
          continue;
        }

        const [fromRow, toRow] = row < enemyRow ? [row, enemyRow] : [enemyRow, row];
        const [fromColumn, toColumn] = column < enemyColumn ? [column, enemyColumn] : [enemyColumn, column];

        result.push([row, column]);
        if (column === enemyColumn) {
          for (let i = fromRow + 1; i < toRow; i++) {
            if (board[i][column].state !== "empty") {
              result.pop();
              break;
            }
          }
        } else {
          for (let i = fromColumn + 1; i < toColumn; i++) {
            if (board[row][i].state !== "empty") {
              result.pop();
              break;
            }
          }
        }
      }
    }
  }

  return result;
};

export const calculatePossibleMoves = (board: Cell[][], selected: Cell): CellIndex[] => {
  const piece = selected.state as Piece;
  const position = selected.index;

  if (piece.name === PieceNames.PAWN) {
    return pawnMove(board, piece, position);
  }

  if (piece.name === PieceNames.KNIGHT) {
    return knightMove(board, piece, position);
  }

  if (piece.name === PieceNames.ROOK) {
    return rookMove(board, piece, position);
  }
  
  if (piece.name === PieceNames.BISHOP) {
    return bishopMove(board, piece, position);
  }

  if (piece.name === PieceNames.QUEEN) {
    return queenMove(board, piece, position);
  }

  if (piece.name === PieceNames.KING) {
    return kingMove(board, piece, position);
  }

  return [];
};

const pawnMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  const isWhite = piece.color === "white";
  const step1 = isWhite ? 1 : -1;
  const step2 = isWhite ? 2 : -2;
  const r1 = row + step1;
  const r2 = row + step2;

  if (board[r1][column].state === "empty") {
    result.push([r1, column]);

    const isStart = isWhite ? row === 1 : row === 6;
    if (isStart && board[r2][column].state === "empty") {
      result.push([r2, column]);
    }
  }

  if (column + 1 < 8) {
    const isLeftEnemy = (
      board[r1][column + 1].state !== "empty" 
      && (board[r1][column + 1].state as Piece).color !== piece.color
    );

    if (isLeftEnemy) {
      result.push([r1, column + 1]);
    }
  }

  if (column - 1 > -1) {
    const isRightEnemy = (
      board[r1][column -1].state !== "empty" 
      && (board[r1][column - 1].state as Piece).color !== piece.color
    );

    if (isRightEnemy) {
      result.push([r1, column - 1]);
    }

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

const moveHelper = (board: Cell[][], color:PieceColor, row: number, column: number) => {
  if (board[row][column].state === "empty") {
    return [true, false];
  }

  const isEnemy = (board[row][column].state as Piece).color !== color;

  if (isEnemy) {
    return [true, true];
  }

  return [false, true];
};

const rookMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  // TO RIGHT
  for (let i = column + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      result.push([row, i]);
    }

    if (isBreak) {
      break;
    }
  }

  // TO LEFT
  for (let i = column - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, row, i);

    if (isAdd) {
      result.push([row, i]);
    }

    if (isBreak) {
      break;
    }
  }

  // UP
  for (let i = row + 1; i < 8; i++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      result.push([i, column]);
    }

    if (isBreak) {
      break;
    }
  }

  // DOWN
  for (let i = row - 1; i > -1; i--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, column);

    if (isAdd) {
      result.push([i, column]);
    }

    if (isBreak) {
      break;
    }
  }

  return result;
};

const bishopMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const [row, column] = position;
  const result: CellIndex[] = [];

  // UP RIGHT
  for (let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);

    if (isAdd) {
      result.push([i, j]);
    }

    if (isBreak) {
      break;
    }
  }

  // UP LEFT
  for (let i = row + 1, j = column - 1; i < 8 && j > -1; i++, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
  
    if (isAdd) {
      result.push([i, j]);
    }

    if (isBreak) {
      break;
    }
  }
    
  // DOWN LEFT
  for (let i = row - 1, j = column - 1; i > -1 && j > -1; i--, j--) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
    
    if (isAdd) {
      result.push([i, j]);
    }
  
    if (isBreak) {
      break;
    }
  }
    
  // DOWN RIGHT
  for (let i = row - 1, j = column + 1; i > -1 && j < 8; i--, j++) {
    const [isAdd, isBreak] = moveHelper(board, piece.color, i, j);
      
    if (isAdd) {
      result.push([i, j]);
    }
    
    if (isBreak) {
      break;
    }
  }
    
  return result;
};

const queenMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
  const rookMoves = rookMove(board, piece, position);
  const bishopMoves = bishopMove(board, piece, position);

  return [...rookMoves, ...bishopMoves];
};

const getEnemies = (board: Cell[][], color: PieceColor): Cell[] => {
  const enemyPieces: Cell[] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isEnemy = board[i][j].state !== "empty" && (board[i][j].state as Piece).color !== color;

      if (isEnemy) {
        enemyPieces.push(board[i][j]);
      }
    }
  }

  return enemyPieces;
};

// const getUnsaveCells = (board: Cell[][], piece: Piece): CellIndex[] => {
//   const enemies = getEnemies(board, piece.color);

//   const enemyMoves: CellIndex[] = [];
  
//   enemies.forEach((cell) => {
//     const piece = cell.state as Piece;
//     const position = cell.index;
    
    
//     let result: CellIndex[] = [];
    
//     if (piece.name === PieceNames.KNIGHT) {
//       result = knightMove(board, piece, position);
//     }

//     if (piece.name === PieceNames.ROOK) {
//       result = rookMove(board, piece, position);
//     }

//     if (piece.name === PieceNames.BISHOP) {
//       result = bishopMove(board, piece, position);
//     }

//     if (piece.name === PieceNames.QUEEN) {
//       result = queenMove(board, piece, position);
//     }

//     enemyMoves.push(...result);
//   });
    
//   return enemyMoves;
// };

const isSave = (enemies: Cell[], row: number, column: number): boolean => {
  for (let i = 0; i < enemies.length; i++) {
    const enemyPiece = enemies[i].state as Piece;
    const [enemyRow, enemyColumn] = enemies[i].index;

    if (enemyPiece.name === PieceNames.ROOK) {
      if (enemyRow !== row && enemyColumn !== column) {
        continue;
      }
    }
  }

  return true;
};

const kingMove = (board: Cell[][], piece: Piece, position: CellIndex): CellIndex[] => {
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