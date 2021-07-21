import { ReactElement, useEffect, useState } from "react";

import {
  constructBoardMatrix,
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

  // Place a piece for the current player if the space is empty
  const handlePlacePiece = (yx: Coordinates) => {
    setBoardMatrix(
      placePiece(boardMatrix as BoardMatrix, yx, playerTurn, endTurn)
    );
    console.log(getSurroundingInfo(boardMatrix, yx));
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
                handlePlacePiece={handlePlacePiece}
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
