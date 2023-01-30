import { DisabledCell, StartGameCell } from "../cell";
import { useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import { getPiece } from "./utils";

import styles from "./styles.module.scss";

type Props = { rowNumber: number, side: "black" | "white" }

const StartGameRow = ({ rowNumber, side }: Props) => {
  const board = useSelector(boardSelector);
  const row = board[rowNumber - 1];

  return (
    <div className={styles.row}>
      <DisabledCell>{rowNumber}</DisabledCell>
      {row.map((cell) => {
        const { index } = cell;

        return (
          <StartGameCell
            side={side}
            key={`${index[0]}${index[1]}`}
            {...cell}
          >
            {cell.state === "empty"
              ? ""
              : <img src={getPiece(`${cell.state.name}_${cell.state.color}`)} />}
          </StartGameCell>
        );
      }
      )}
    </div>
  );};

export default StartGameRow;