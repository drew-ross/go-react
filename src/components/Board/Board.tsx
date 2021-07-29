import { ReactElement, useEffect, useState } from "react";

import {
  captureGroups,
  checkEmpty,
  combineGroups,
  constructBoardMatrix,
  getLibertyCountForGroup,
  getLibertyCountFromSpaces,
  getMatchingGroups,
  getSpacesFromMetas,
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
      const groupNumbers = getMatchingGroups(
        getSpacesFromMetas(surroundingInfo),
        playerTurn
      );
      // Check if player has groups surrounding the chosen space with enough liberties
      if (
        groupNumbers.myGroups.length > 0 &&
        groupNumbers.myGroups.some(
          (groupNumber) =>
            getLibertyCountForGroup(groups, boardMatrix, groupNumber) > 1
        )
      ) {
        // Place the piece and combine adjacent groups
        const combined = combineGroups(
          groups,
          boardMatrix,
          groupNumbers.myGroups
        );
        const boardWithPlayerMove = placePiece(
          combined.boardMatrix,
          combined.groups,
          yx,
          playerTurn,
          combined.groupNumber
        );
        // Capture opponent groups if able
        const opponentsToCapture: number[] = [];
        groupNumbers.opponentGroups.forEach((groupNumber) => {
          if (
            getLibertyCountForGroup(
              boardWithPlayerMove.groups,
              boardWithPlayerMove.boardMatrix,
              groupNumber
            ) === 0
          ) {
            opponentsToCapture.push(groupNumber);
          }
        });
        if (opponentsToCapture.length > 0) {
          const boardWithCaptures = captureGroups(
            boardWithPlayerMove.groups,
            boardWithPlayerMove.boardMatrix,
            opponentsToCapture
          );
          setBoardMatrix(boardWithCaptures.boardMatrix);
          setGroups(boardWithCaptures.groups);
          console.log(boardWithCaptures.points);
        } else {
          setBoardMatrix(boardWithPlayerMove.boardMatrix);
          setGroups(boardWithPlayerMove.groups);
        }
        endTurn();
      } else if (
        // Check if this space has enough liberties
        getLibertyCountFromSpaces(getSpacesFromMetas(surroundingInfo)) > 0
      ) {
        const boardWithPlayerMove = placePiece(
          boardMatrix,
          groups,
          yx,
          playerTurn
        );
        setBoardMatrix(boardWithPlayerMove.boardMatrix);
        setGroups(boardWithPlayerMove.groups);
        endTurn();
      }
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
