import { ReactElement } from "react";
import { BoardSpace } from "../../types/gameTypes";

import "./Space.css";

interface SpaceProps {
  value: BoardSpace;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value } = props;

  return (
    <button className='Space'>
      <span>{value}</span>
    </button>
  );
};

export default Space;
