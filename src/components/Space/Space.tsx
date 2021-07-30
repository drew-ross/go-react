import { useState } from "react";
import { ReactElement } from "react";
import { STAR_POINTS } from "../../constants/constants";
import { BoardSpace, Coordinates, PieceColor } from "../../types/gameTypes";

import "./Space.css";

interface SpaceProps {
  value: BoardSpace;
  playerTurn: PieceColor;
  yx: Coordinates;
  handleMove: (yx: Coordinates) => void;
  showDebug: boolean;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value, yx, handleMove, showDebug, playerTurn } = props;
  const [y, x] = yx;
  const [isStarPoint] = useState<boolean>(() => {
    return STAR_POINTS.some((pointYX) => pointYX[0] === y && pointYX[1] === x);
  });
  const [lineStyle] = useState<string>(() => {
    if (y === 0) {
      if (x === 0) {
        return "--top-left";
      } else if (x === 18) {
        return "--top-right";
      } else {
        return "--top";
      }
    } else if (x === 0) {
      if (y === 18) {
        return "--bottom-left";
      } else {
        return "--left";
      }
    } else if (x === 18) {
      if (y === 18) {
        return "--bottom-right";
      } else {
        return "--right";
      }
    } else if (y === 18) {
      return "--bottom";
    } else {
      return "";
    }
  });

  const handleClick = () => {
    handleMove(yx);
  };

  return (
    <button className={`Space ${value[0]}`} onClick={handleClick}>
      <div className={`line-h${lineStyle}`} />
      <div className={`line-v${lineStyle}`} />
      <div className='stone-display' />
      {value[0] === "N" && (
        <div className={`hover-stone-display ${playerTurn}`} />
      )}
      {isStarPoint && <div className='star-point' />}
      {showDebug && <span className='debug-display'>{`${y}, ${x}`}</span>}
    </button>
  );
};

export default Space;
