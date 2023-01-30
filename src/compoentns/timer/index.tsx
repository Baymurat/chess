import { useSelector } from "react-redux";

import { timeSelector } from "../../redux/features/timer/timerSlice";
import styles from "./styles.module.scss";

const Timer = () => {
  const time = useSelector(timeSelector);

  return(
    <div className={styles.timer}>
      Timer
      <div>
        {time}
      </div>
    </div>
  );};

export default Timer;