import { PropsWithChildren } from "react";
import { Cell } from "../../types/types";
import { GameCell } from "./index";
import PromotionModal from "../promotion-modal";
import { onClickCell } from "../../redux/features/board/boardSlice";
import { useDispatch } from "react-redux";

type Props = PropsWithChildren & Cell & { side: "white" | "black" };

const StartGameCell = (props: Props) => {
  const {
    isPromoteable, side, index 
  } = props;
  const dispatch = useDispatch();

  return (
    <div>
      {isPromoteable && <PromotionModal index={index} side={side} />}
      <GameCell 
        onClick={() => dispatch(onClickCell({ index }))}
        {...props}
      />
    </div>
  );};

export default StartGameCell;
