import { ReactElement } from "react";
import { BoardSpace } from '../../types/gameTypes';

interface SpaceProps {
  value: BoardSpace;
}

const Space = (props: SpaceProps): ReactElement => {
  const { value } = props;

  return <div className='Space'>{value}</div>;
};

export default Space;
