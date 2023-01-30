import cx from "classnames";
import { useDispatch } from "react-redux";

import { promotePawn } from "../../redux/features/board/boardSlice";
import { CellIndex, PieceNames } from "../../types/types";
import GameCell from "../cell/GameCell";
import { getPiece } from "../row/utils";
import styles from "./styles.module.scss";

type Props = {
  side: "white" | "black";
  index: CellIndex;
}

const PromotionModal = (props: Props) => {
  const { side, index } = props;
  const appearSide = side === "white" ? styles.whiteSide : styles.blackSide;
  const dispatch = useDispatch();

  return (
    <div className={cx(styles.modal, appearSide)}>
      <GameCell
        onClick={() => dispatch(promotePawn({ index, piece: { name: PieceNames.QUEEN, color: side }}))}
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
        onClick={() => dispatch(promotePawn({ index, piece: { name: PieceNames.BISHOP, color: side }}))}
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
        onClick={() => dispatch(promotePawn({ index, piece: { name: PieceNames.ROOK, color: side }}))}
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
        onClick={() => dispatch(promotePawn({ index, piece: { name: PieceNames.KNIGHT, color: side }}))}
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