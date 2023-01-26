import { useRef, useEffect } from "react";
import { useSelector} from "react-redux";
import { historySelector } from "../../redux/features/board/boardSlice";
import Move from "./Move";

import styles from "./styles.module.scss";

const History = () => {
  const history = useSelector(historySelector);
  const scrollDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history.length]);

  return (
    <div className={styles.history}>
      {history.map((move) => (
        <Move key={move.id} {...move}/>
      ))}
      <div ref={scrollDivRef} className={styles.scrollDiv}></div>
    </div>
  );};

export default History;