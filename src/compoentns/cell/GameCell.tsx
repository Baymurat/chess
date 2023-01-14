import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { onClickCell } from "../../redux/features/board/boardSlice";
import { useDispatch } from "react-redux";
import { Cell } from "../../types/types";

type Props = PropsWithChildren & Omit<Cell, "state">;

const Cell = ({
  isPossibleMove, isSelected, isWhite, index, children 
}: Props) => {
  const dispatch = useDispatch();
  
  return (
    <div 
      className={cx(styles.cell, { 
        [styles.white]: isWhite,
        [styles.possibleMove]: isPossibleMove,
        [styles.selected]: isSelected,
      })}
      onClick={() => dispatch(onClickCell({ index }))}
    >
      {children}
    </div>
  );};

export default Cell;