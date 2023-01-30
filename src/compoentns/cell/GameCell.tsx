import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Cell } from "../../types/types";

type Props = PropsWithChildren & Cell & { onClick: () => void};

const GameCell = ({
  isPossibleMove,
  isSelected,
  isWhite,
  children,
  state,
  isReachableCell,
  isForbiddenForKing,
  isTargetKing,
  onClick,
}: Props) => {
  const isUnderAttack = state !== "empty" && isPossibleMove;

  return (
    <div
      className={cx(styles.cell, {
        [styles.white]: isWhite,
        [styles.selected]: isSelected,
        [styles.reachable]: isReachableCell,
        [styles.impossible]: !isPossibleMove,
        [styles.underattack]: isUnderAttack,
        [styles.forbidden]: !isPossibleMove && isForbiddenForKing,
        [styles.isTargetKing]: isTargetKing,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GameCell;