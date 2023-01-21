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
  isImpossibleMove: boolean;
  isWhite: boolean;
  isReachableCell: boolean;
  isKing?: boolean;
}

export type ReachableCell = Pick<Cell, "index" | "isPossibleMove" | "isKing">;

export type BoardStore = {
  board: Cell[][];
  loading: boolean;
  error: string;
  selectedCellIndex: CellIndex;
  possibleMoves: CellIndex[];
  impossibleMoves: CellIndex[];
  turn: PieceColor;
  reachableCells: ReachableCell[];
}

export type PieceColor = "white" | "black"