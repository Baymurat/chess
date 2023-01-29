import { PropsWithChildren } from "react";
import { Cell } from "../../types/types";
import { GameCell } from "./index";
import PromotionModal from "../promotion-modal";

type Props = PropsWithChildren & Cell & { side: "white" | "black" };

const StartGameCell = (props: Props) => {
  const { isPromoteable, side } = props;

  return (
    <div>
      {isPromoteable && <PromotionModal side={side} />}
      <GameCell {...props}/>
    </div>
  );};

export default StartGameCell;
