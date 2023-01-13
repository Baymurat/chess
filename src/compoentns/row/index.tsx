import Cell from "../cell";
import { useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import { getPiece } from "./utils";

import styles from "./styles.module.scss";

type Props = {
  isEven?: boolean;
  rowNumber: number;
}

const letters = "abcdefgh";

const Row = ({ isEven, rowNumber }: Props) => {
  const board = useSelector(boardSelector);
  const offset = (rowNumber - 1) * 8;
  const row = board.slice(offset, offset + 8);

  return (
    <div className={styles.row}>
      <Cell index="" isDisabled >{rowNumber}</Cell>
      {row.map((cell, i) => {
        const isWhite = i % 2 === 0 ? isEven : !isEven;
        const index = `${rowNumber}${letters[i]}`;

        return (
          <Cell 
            key={index}
            index={index} 
            isWhite={isWhite}
          >
            {cell.state === "empty" 
              ? "" 
              : <img src={getPiece(`${cell.state.name}_${cell.state.color}`)} />}
          </Cell>
        );
      }
      )}
    </div>
  );};

export default Row;