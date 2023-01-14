import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

const DisabledCell = ({ children }: PropsWithChildren) => (
  <div className={styles.disabled}>{children}</div>
);

export default DisabledCell;