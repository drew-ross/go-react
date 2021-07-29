import { ReactElement } from "react";
import { BoardSpace, Coordinates } from "../../types/gameTypes";

import "./Space.css";

interface SpaceProps {
  value: BoardSpace;
  yx: Coordinates;
  handleMove: (yx: Coordinates) => void;
  showDebug: boolean;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value, yx, handleMove, showDebug } = props;

  const handleClick = () => {
    handleMove(yx);
  };

  return (
    <button className={`Space ${value[0]}`} onClick={handleClick}>
      <div className='line-h' />
      <div className='line-v' />
      <div className='stone-display' />
      {showDebug && (
        <span className='debug-display'>{`${yx[0]}, ${yx[1]}`}</span>
      )}
    </button>
  );
};

export default Space;
