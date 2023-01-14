import { HorizontalLegendRow, GameRow } from "../row";

import styles from "./styles.module.scss";

const Board = () => (
  <div className={styles.board}>
    <GameRow rowNumber={8} />
    <GameRow rowNumber={7} />
    <GameRow rowNumber={6} />
    <GameRow rowNumber={5} />
    <GameRow rowNumber={4} />
    <GameRow rowNumber={3} />
    <GameRow rowNumber={2}/>
    <GameRow rowNumber={1} />
    <HorizontalLegendRow />
  </div>
);

export default Board;