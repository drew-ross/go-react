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

  const handleClick = () => {
    handleMove(yx);
  };

  return (
    <button className={`Space ${value[0]}`} onClick={handleClick}>
      <div className='line-h' />
      <div className='line-v' />
      <div className='stone-display' />
      {value[0] === "N" && (
        <div className={`hover-stone-display ${playerTurn}`} />
      )}
      {isStarPoint && (
        <div className='star-point' />
      )}
      {showDebug && (
        <span className='debug-display'>{`${y}, ${x}`}</span>
      )}
    </button>
  );
};

export default Space;
