import DisabledCell from "../cell/DisabledCell";

import styles from "./styles.module.scss";

const HorizontalLegendRow = () => (
  <div className={styles.row}>
    <DisabledCell />
    <DisabledCell>A</DisabledCell>
    <DisabledCell>B</DisabledCell>
    <DisabledCell>C</DisabledCell>
    <DisabledCell>D</DisabledCell>
    <DisabledCell>E</DisabledCell>
    <DisabledCell>F</DisabledCell>
    <DisabledCell>G</DisabledCell>
    <DisabledCell>H</DisabledCell>
  </div>
);

export default HorizontalLegendRow;