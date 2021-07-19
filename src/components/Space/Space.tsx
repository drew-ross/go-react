import { ReactElement } from "react";
import { BoardSpace, Coordinates } from "../../types/gameTypes";

import "./Space.css";

interface SpaceProps {
  value: BoardSpace;
  yx: Coordinates;
  placePiece: (yx: Coordinates) => void;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value, yx, placePiece } = props;

  const handleClick = () => {
    placePiece(yx);
  };

  return (
    <button className={`Space ${value}`} onClick={handleClick}>
      <span>{yx[0]}, {yx[1]}</span>
    </button>
  );
};

export default Space;
