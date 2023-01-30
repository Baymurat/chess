import { DisabledCell, GameCell } from "../cell";
import { useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import { getPiece } from "./utils";
import { useDispatch } from "react-redux";
import { onClickCell } from "../../redux/features/board/boardSlice";

import styles from "./styles.module.scss";

type Props = { rowNumber: number }

const Row = ({ rowNumber }: Props) => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelector);
  const row = board[rowNumber - 1];

  return (
    <div className={styles.row}>
      <DisabledCell>{rowNumber}</DisabledCell>
      {row.map((cell) => {
        const { index } = cell;

        return (
          <GameCell
            onClick={() => dispatch(onClickCell({ index }))}
            key={`${index[0]}${index[1]}`}
            {...cell}
          >
            {cell.state === "empty"
              ? ""
              : <img src={getPiece(`${cell.state.name}_${cell.state.color}`)} />}
          </GameCell>
        );
      }
      )}
    </div>
  );};

export default Row;