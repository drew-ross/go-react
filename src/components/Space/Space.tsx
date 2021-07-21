import { ReactElement } from "react";
import { BoardSpace, Coordinates } from "../../types/gameTypes";

import "./Space.css";

interface SpaceProps {
  value: BoardSpace;
  yx: Coordinates;
  handlePlacePiece: (yx: Coordinates) => void;
  showDebug: boolean;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value, yx, handlePlacePiece, showDebug } = props;

  const handleClick = () => {
    handlePlacePiece(yx);
  };

  return (
    <button className={`Space ${value[0]}`} onClick={handleClick}>
      <span>{showDebug && `${yx[0]}, ${yx[1]}`}</span>
    </button>
  );
};

export default Space;
