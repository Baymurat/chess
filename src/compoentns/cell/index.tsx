import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = PropsWithChildren & {
  isDisabled?: boolean;
  isWhite?: boolean;
  index: string;
}

const Cell = ({
  isWhite, index, isDisabled, children 
}: Props) => (
  <div className={cx(styles.cell, { 
    [styles.white]: isWhite,
    [styles.disabled]: isDisabled
  })}>
    {children}
  </div>
);

export default Cell;