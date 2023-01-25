import { HorizontalLegendRow, GameRow } from "../row";
import { useSelector } from "react-redux";
import GameOverBanner from "./GameOverBanner";
import { turnSelector, gameOverSelector } from "../../redux/features/board/boardSlice";

import styles from "./styles.module.scss";

const Board = () => {
  const turn = useSelector(turnSelector);
  const isGameOver = useSelector(gameOverSelector);
  console.log(isGameOver);
  
  return (
    <div className={styles.wrapper}>
      {isGameOver && <GameOverBanner />}
      <div className={styles.wrapper__header}>{turn}</div>
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
    </div>
  );};

export default Board;