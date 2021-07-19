import { ReactElement, useState } from "react";

import { constructBoardMatrix } from "../../helpers";
import { BoardMatrix } from "../../types/gameTypes";

import Space from "../Space/Space";

import "./Board.css";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );

  return (
    <div className='Board'>
      {boardMatrix.length > 0 &&
        boardMatrix.map((row, coordY) => (
          <div className='Board-row'>
            {row.map((spaceValue, coordX) => (
              <Space key={`${coordY}, ${coordX}`} value={spaceValue} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
