import Cell from "../cell";

import styles from "./styles.module.scss";

type Props = {
  isEven?: boolean;
  rowNumber: number;
}

const Row = ({ isEven, rowNumber }: Props) => (
  <div className={styles.row}>
    <Cell index="" isDisabled >{rowNumber}</Cell>
    <Cell index={`${rowNumber}a`} isWhite={isEven} />
    <Cell index={`${rowNumber}b`} isWhite={!isEven} />
    <Cell index={`${rowNumber}c`} isWhite={isEven} />
    <Cell index={`${rowNumber}d`} isWhite={!isEven} />
    <Cell index={`${rowNumber}e`} isWhite={isEven} />
    <Cell index={`${rowNumber}f`} isWhite={!isEven} />
    <Cell index={`${rowNumber}g`} isWhite={isEven} />
    <Cell index={`${rowNumber}h`} isWhite={!isEven} />
  </div>
);

export default Row;