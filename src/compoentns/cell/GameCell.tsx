import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { onClickCell } from "../../redux/features/board/boardSlice";
import { useDispatch } from "react-redux";
import { Cell } from "../../types/types";

type Props = PropsWithChildren & Cell;

const Cell = ({
  isPossibleMove, isImpossibleMove, isSelected, isWhite, index, children, state, isReachableCell
}: Props) => {
  const dispatch = useDispatch();
  const isUnderAttack = state !== "empty" && isPossibleMove;

  return (
    <>
      {/* <div 
        className={cx(styles.cell, { 
          [styles.white]: isWhite,
          [styles.possibleMove]: isPossibleMove,
          [styles.selected]: isSelected,
          [styles.underAttack]: isUnderAttack,
          [styles.impossibleMove]: isImpossibleMove,
        })}
        onClick={() => dispatch(onClickCell({ index }))}
      >
        {children}
      </div> */}
      <div 
        className={cx(styles.cell, { 
          [styles.white]: isWhite,
          [styles.selected]: isSelected,
          [styles.reachable]: isReachableCell,
          [styles.impossible]: !isPossibleMove,
          [styles.underattack]: isUnderAttack,
          [styles.forbidden]: isImpossibleMove,
        })}
        onClick={() => dispatch(onClickCell({ index }))}
      >
        {children}
      </div>
    </>
  );
};

export default Cell;