import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { gameOverSelector, restartGame, turnSelector } from "../../redux/features/board/boardSlice";
import History from "../history";
import { GameRow, HorizontalLegendRow, StartGameRow } from "../row";
import Timer from "../timer";
import GameOverBanner from "./GameOverBanner";
import styles from "./styles.module.scss";

const Board = () => {
  const turn = useSelector(turnSelector);
  const dispatch = useDispatch();
  const isGameOver = useSelector(gameOverSelector);

  return (
    <div className={styles.wrapper}>
      {isGameOver && <GameOverBanner />}
      {!isGameOver && (
        <button onClick={() => {
          dispatch(restartGame());
        }}
        >RESTART
        </button>
      )}
      <Link
        to="/"
        onClick={() => dispatch(restartGame())}
      >
        Back to menu
      </Link>
      <div className={styles.wrapper__header}>{turn}</div>
      <div className={styles.wrapper__game}>
        <div className={styles.left}>
          <div className={styles.board}>
            <StartGameRow side="white" rowNumber={8} />
            <GameRow rowNumber={7} />
            <GameRow rowNumber={6} />
            <GameRow rowNumber={5} />
            <GameRow rowNumber={4} />
            <GameRow rowNumber={3} />
            <GameRow rowNumber={2} />
            <StartGameRow side="black" rowNumber={1} />
            <HorizontalLegendRow />
          </div>
        </div>
        <div className={styles.right}>
          <Timer />
          <History />
        </div>
      </div>
    </div>
  );
};

export default Board;
