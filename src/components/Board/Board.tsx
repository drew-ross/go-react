import { ReactElement, useEffect, useState } from "react";

import {
  checkEmpty,
  combineGroups,
  constructBoardMatrix,
  getMatchingGroups,
  getSurroundingInfo,
  placePiece,
} from "../../helpers/helpers";
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
  // Debug state
  const [renderCycle, setRenderCycle] = useState(0);

  // Debug logs
  useEffect(() => {
    console.log(`--- Cycle ${renderCycle}`);
    setRenderCycle(renderCycle + 1);
    console.log("groups", groups);
    console.log("boardMatrix", boardMatrix);
    // eslint-disable-next-line
  }, [groups, boardMatrix]);

  // Change the piece color that will be played
  const endTurn = () => {
    setPlayerTurn(() => (playerTurn === "B" ? "W" : "B"));
  };

  const handleMove = (yx: Coordinates) => {
    if (checkEmpty(boardMatrix, yx)) {
      const surroundingInfo = getSurroundingInfo(boardMatrix, yx);
      // Check if player has pieces surrounding this spot
      if (
        surroundingInfo.some(
          (space) => space !== undefined && space[0] === playerTurn
        )
      ) {
        const groupNumbers = getMatchingGroups(surroundingInfo, playerTurn);
        const combined = combineGroups(groups, boardMatrix, groupNumbers);
        const newBoard = placePiece(
          combined.boardMatrix,
          combined.groups,
          yx,
          playerTurn,
          combined.groupNumber
        );
        setBoardMatrix(newBoard.boardMatrix);
        setGroups(newBoard.groups);
      } else {
        const newBoard = placePiece(boardMatrix, groups, yx, playerTurn);
        setBoardMatrix(newBoard.boardMatrix);
        setGroups(newBoard.groups);
      }
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
