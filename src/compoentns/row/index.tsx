import Cell from "../cell";
import { useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import { getPiece } from "./utils";

import styles from "./styles.module.scss";

type Props = {
  isEven?: boolean;
  rowNumber: number;
}

const Row = ({ rowNumber }: Props) => {
  const board = useSelector(boardSelector);
  const row = board[rowNumber - 1];

  return (
    <div className={styles.row}>
      <Cell index={[99, 99]} isDisabled >{rowNumber}</Cell>
      {row.map((cell) => {
        const { index } = cell;

        return (
          <Cell 
            key={`${index[0]}${index[1]}`}
            {...cell}
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