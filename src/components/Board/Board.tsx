import { ReactElement, useState } from "react";
import { constructBoardMatrix } from "../../helpers";
import { BoardMatrix } from "../../types/gameTypes";
import Space from "../Space/Space";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );

  return (
    <div className='Board'>
      <div className='Board-row'>
        {boardMatrix.length > 0 &&
          boardMatrix.map((row, coordY) =>
            row.map((spaceValue, coordX) => (
              <Space key={`${coordY}, ${coordX}`} value={spaceValue} />
            ))
          )}
      </div>
    </div>
  );
};

export default Board;
