import { useDispatch } from "react-redux";

import { restartGame } from "../../redux/features/board/boardSlice";
import styles from "./styles.module.scss";

const GameOverBanner = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.gameOver}>
      CHECKMATE
      <br />
      GAME OVER
      <button
        type="button"
        onClick={() => dispatch(restartGame())}
      >
        Restart
      </button>
    </div>
  );
};

export default GameOverBanner;
