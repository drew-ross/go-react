import { ReactElement, useState } from "react";

import { constructBoardMatrix } from "../../helpers";
import { BoardMatrix, Coordinates, PieceColor } from "../../types/gameTypes";

import Space from "../Space/Space";

import "./Board.css";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );
  const [playerTurn, setPlayerTurn] = useState<PieceColor>("B");
  const [showDebug, setShowDebug] = useState<boolean>(false);

  // Change the piece color that will be played
  const endTurn = () => {
    setPlayerTurn(() => (playerTurn === "B" ? "W" : "B"));
  };

  // Place a piece for the current player if the space is empty
  const placePiece = (yx: Coordinates) => {
    setBoardMatrix((prevBoardMatrix) =>
      prevBoardMatrix.map((row, y) => {
        if (yx[0] === y) {
          return row.map((space, x) => {
            if (yx[1] === x && space[0] === "N") {
              endTurn();
              return [playerTurn, null];
            } else {
              return space;
            }
          });
        } else {
          return row;
        }
      })
    );
  };

  return (
    <div className='Board'>
      {boardMatrix.length > 0 &&
        boardMatrix.map((row, coordY) => (
          <div className='Board-row'>
            {row.map((spaceValue, coordX) => (
              <Space
                key={`${coordY}, ${coordX}`}
                value={spaceValue}
                yx={[coordY, coordX]}
                placePiece={placePiece}
                showDebug={showDebug}
              />
            ))}
          </div>
        ))}
      <button onClick={() => setShowDebug(!showDebug)}>{`${
        showDebug ? "Hide" : "Show"
      } Debug Overlay`}</button>
    </div>
  );
};

export default Board;
