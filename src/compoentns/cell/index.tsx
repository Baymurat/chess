import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { onClickCell } from "../../redux/features/board/boardSlice";
import { useDispatch } from "react-redux";

type Props = PropsWithChildren & {
  isDisabled?: boolean;
  isWhite?: boolean;
  index: string;
  isSelected?: boolean;
  isPossibleMove?: boolean;
}

const Cell = ({
  isPossibleMove, isSelected, isWhite, index, isDisabled, children 
}: Props) => {
  const dispatch = useDispatch();
  
  return (
    <div 
      className={cx(styles.cell, { 
        [styles.white]: isWhite,
        [styles.disabled]: isDisabled,
        [styles.possibleMove]: isPossibleMove,
        [styles.selected]: isSelected,
      })}
      onClick={() => dispatch(onClickCell({ index }))}
    >
      {children}
    </div>
  );};

export default Cell;