import Cell from "../cell";

import styles from "./styles.module.scss";

const HorizontalLegendRow = () => (
  <div className={styles.row}>
    <Cell index={[99, 99]} isDisabled />
    <Cell index={[99, 99]} isDisabled>A</Cell>
    <Cell index={[99, 99]} isDisabled>B</Cell>
    <Cell index={[99, 99]} isDisabled>C</Cell>
    <Cell index={[99, 99]} isDisabled>D</Cell>
    <Cell index={[99, 99]} isDisabled>E</Cell>
    <Cell index={[99, 99]} isDisabled>F</Cell>
    <Cell index={[99, 99]} isDisabled>G</Cell>
    <Cell index={[99, 99]} isDisabled>H</Cell>
  </div>
);

export default HorizontalLegendRow;