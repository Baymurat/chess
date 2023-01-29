import GameCell from "../cell/GameCell";
import { getPiece } from "../row/utils";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = {
  side: "white" | "black"
}

const PromotionModal = (props: Props) => {
  const { side } = props;
  const appearSide = side === "white" ? styles.whiteSide : styles.blackSide;

  return (
    <div className={cx(styles.modal, appearSide)}>
      <GameCell
        state={"empty"}
        index={[-1, -1]}
        isSelected={false}
        isPossibleMove={false}
        isWhite={true}
        isReachableCell={false}
      >
        <img src={getPiece(`queen_${side}`)} />
      </GameCell>
      <GameCell
        state={"empty"}
        index={[-1, -1]}
        isSelected={false}
        isPossibleMove={false}
        isWhite={true}
        isReachableCell={false}
      >
        <img src={getPiece(`bishop_${side}`)} />        
      </GameCell>
      <GameCell
        state={"empty"}
        index={[-1, -1]}
        isSelected={false}
        isPossibleMove={false}
        isWhite={true}
        isReachableCell={false}
      >
        <img src={getPiece(`rook_${side}`)} />
      </GameCell>
      <GameCell
        state={"empty"}
        index={[-1, -1]}
        isSelected={false}
        isPossibleMove={false}
        isWhite={true}
        isReachableCell={false}
      >
        <img src={getPiece(`knight_${side}`)} />
      </GameCell>
    </div>
  );};

export default PromotionModal;