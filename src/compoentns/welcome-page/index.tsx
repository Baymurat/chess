import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const WelcomePage = () => (
  <div className={styles.welcomePage}>
    <div className={styles.modal}>
      <Link to={"/game"}>Start game</Link>
      <Link to={"/online"}>Play Online</Link>
      <Link to={"/watch-record"}>Watch record</Link>
    </div>
  </div>
);

export default WelcomePage;