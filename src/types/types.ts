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
  state: "empty" | Piece; 
  index: CellIndex;
  isSelected: boolean;
  isPossibleMove: boolean;
  isWhite: boolean;
  isReachableCell: boolean;
  isForbiddenForKing?: boolean;
  isTargetKing?: boolean;
}

export type ReachableCell = Pick<Cell, "index" | "isPossibleMove" | "isForbiddenForKing">;

export type BoardStore = {
  board: Cell[][];
  loading: boolean;
  error: string;
  selectedCellIndex: CellIndex;
  turn: PieceColor;
  reachableCells: ReachableCell[];
  inDangerKingPosition: CellIndex;
  isGameOver: boolean;
}

export type PieceColor = "white" | "black"