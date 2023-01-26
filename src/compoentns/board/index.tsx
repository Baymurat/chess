import { HorizontalLegendRow, GameRow } from "../row";
import { useSelector, useDispatch } from "react-redux";
import GameOverBanner from "./GameOverBanner";
import History from "../history";
import { turnSelector, gameOverSelector, restartGame } from "../../redux/features/board/boardSlice";

import styles from "./styles.module.scss";

const Board = () => {
  const turn = useSelector(turnSelector);
  const dispatch = useDispatch();
  const isGameOver = useSelector(gameOverSelector);
  
  return (
    <div className={styles.wrapper}>
      {isGameOver && <GameOverBanner />}
      {!isGameOver && <button onClick={() => {
        dispatch(restartGame());
      }}>RESTART</button>}
      <div className={styles.wrapper__header}>{turn}</div>
      <div className={styles.wrapper__game}>
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
        <History />
      </div>
    </div>
  );};

export default Board;