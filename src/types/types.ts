export enum PieceNames {
  PAWN = "PAWN",
  ROOK = "ROOK",
  KNIGHT = "KNIGHT",
  BISHOP = "BISHOP",
  QUEEN = "QUEEN",
  KING = "KING",
}

export type Piece = {
  name: PieceNames;
  color: PieceColor;
}

export type CellIndex = [number, number]

export type Cell = {
  state: CellState;
  index: CellIndex;
  isSelected: boolean;
  isPossibleMove: boolean;
  isWhite: boolean;
  isReachableCell: boolean;
  isForbiddenForKing?: boolean;
  isTargetKing?: boolean;
  isPromoteable?: boolean;
}

export type CellState = "empty" | Piece;

export type ReachableCell = Pick<Cell, "index" | "isPossibleMove" | "isForbiddenForKing">;

export type Move = {
  id: string,
  from: CellIndex,
  to: CellIndex,
  piece: Piece,
}

export type BoardStore = {
  board: Cell[][];
  loading: boolean;
  error: string;
  selectedCellIndex: CellIndex;
  turn: PieceColor;
  reachableCells: ReachableCell[];
  inDangerKingPosition: CellIndex;
  isGameOver: boolean;
  movesHistory: Move[];
  isBoardDisabled: boolean;
}

export type PieceColor = "white" | "black"

export type TimeType = {
  second: number;
  minute: number;
  hour: number;
}

export type TimerStore = {
  time: string;
  isStarted: boolean;
}