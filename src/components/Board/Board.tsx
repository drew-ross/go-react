import { ReactElement, useEffect, useState } from "react";

import {
  checkEmpty,
  constructBoardMatrix,
  getLibertyCount,
  getSurroundingInfo,
  placePiece,
} from "../../helpers";
import {
  BoardMatrix,
  Coordinates,
  Groups,
  PieceColor,
} from "../../types/gameTypes";

import Space from "../Space/Space";

import "./Board.css";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );
  const [playerTurn, setPlayerTurn] = useState<PieceColor>("B");
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [groups, setGroups] = useState<Groups>({});

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  // Change the piece color that will be played
  const endTurn = () => {
    setPlayerTurn(() => (playerTurn === "B" ? "W" : "B"));
  };

  const handleMove = (yx: Coordinates) => {
    if (checkEmpty(boardMatrix, yx)) {
      setBoardMatrix(placePiece(boardMatrix, yx, playerTurn));
      endTurn();
    }
  };

  return (
    <div className='Board'>
      {boardMatrix.length > 0 &&
        boardMatrix.map((row, coordY) => (
          <div className='Board-row' key={`${coordY}`}>
            {row.map((spaceValue, coordX) => (
              <Space
                key={`${coordY}, ${coordX}`}
                value={spaceValue}
                yx={[coordY, coordX]}
                handleMove={handleMove}
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
