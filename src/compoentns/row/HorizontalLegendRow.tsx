import Cell from "../cell";

import styles from "./styles.module.scss";

const HorizontalLegendRow = () => (
  <div className={styles.row}>
    <Cell index="" isDisabled />
    <Cell index="" isDisabled>A</Cell>
    <Cell index="" isDisabled>B</Cell>
    <Cell index="" isDisabled>C</Cell>
    <Cell index="" isDisabled>D</Cell>
    <Cell index="" isDisabled>E</Cell>
    <Cell index="" isDisabled>F</Cell>
    <Cell index="" isDisabled>G</Cell>
    <Cell index="" isDisabled>H</Cell>
  </div>
);

export default HorizontalLegendRow;