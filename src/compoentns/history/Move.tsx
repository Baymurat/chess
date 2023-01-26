import React from "react";
import type { Move as MoveType } from "../../types/types";

import styles from "./styles.module.scss";

type Props = MoveType

const letters = "ABCDEFGH";

const parseMove = (move: MoveType): string => {
  const {
    from, to, piece 
  } = move;

  const [r1, c1] = from;
  const [r2, c2] = to;

  const f = `${r1 + 1}${letters[c1]}`;
  const t = `${r2 + 1}${letters[c2]}`;

  return `${piece.name} ${f} > ${t}`;
};

const Move = (move: Props) => (
  <div className={styles.move}>
    {parseMove(move)}
  </div>
);

export default Move;