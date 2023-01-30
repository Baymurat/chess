import { PropsWithChildren } from "react";
import { useDispatch } from "react-redux";

import { onClickCell } from "../../redux/features/board/boardSlice";
import { Cell } from "../../types/types";
import PromotionModal from "../promotion-modal";
import { GameCell } from "./index";

type Props = PropsWithChildren & Cell & { side: "white" | "black" };

const StartGameCell = (props: Props) => {
  const {
    isPromoteable, side, index,
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
  );
};

export default StartGameCell;
