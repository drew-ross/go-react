import { ReactElement, useState } from "react";
import { constructBoardMatrix } from "../../helpers";
import { BoardMatrix } from "../../types/gameTypes";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );

  return <div className='Board'></div>;
};

export default Board;
