export type Piece = {
  name: string;
  color: "white" | "black";
}

export type CellIndex = [number, number]

export type Cell = {
  state: "empty" | Piece; 
  index: CellIndex;
  isSelected: boolean;
  isPossibleMove: boolean;
  isWhite: boolean;
}

export type BoardStore = {
  board: Cell[][];
  loading: boolean;
  error: string;
  selectedCellIndex: CellIndex;
  possibleMoves: Cell[];
}
