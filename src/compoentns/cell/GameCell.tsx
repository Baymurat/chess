import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { onClickCell } from "../../redux/features/board/boardSlice";
import { useDispatch } from "react-redux";
import { Cell } from "../../types/types";

// type Props = PropsWithChildren & Omit<Cell, "state">;
type Props = PropsWithChildren & Cell;

const Cell = ({
  isPossibleMove, isSelected, isWhite, index, children, state
}: Props) => {
  const dispatch = useDispatch();
  const isUnderAttack = state !== "empty";

  return (
    <div 
      className={cx(styles.cell, { 
        [styles.white]: isWhite,
        [styles.possibleMove]: isPossibleMove,
        [styles.selected]: isSelected,
        [styles.underAttack]: isUnderAttack,
      })}
      onClick={() => dispatch(onClickCell({ index }))}
    >
      {children}
    </div>
  );};

export default Cell;