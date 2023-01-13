import Row from "../row";
import HorizontalLegendRow from "../row/HorizontalLegendRow";

import styles from "./styles.module.scss";

const Board = () => (
  <div className={styles.board}>
    <Row rowNumber={8} isEven />
    <Row rowNumber={7} />
    <Row rowNumber={6} isEven />
    <Row rowNumber={5} />
    <Row rowNumber={4} isEven />
    <Row rowNumber={3} />
    <Row rowNumber={2} isEven/>
    <Row rowNumber={1} />
    <HorizontalLegendRow />
  </div>
);

export default Board;