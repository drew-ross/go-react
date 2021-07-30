import { ReactElement, useEffect, useState } from "react";

import {
  addPoints,
  captureGroups,
  checkEmpty,
  combineGroups,
  constructBoardMatrix,
  getLibertyCountForGroup,
  getLibertyCountFromSpaces,
  getMatchingGroups,
  getSpacesFromMetas,
  getSurroundingInfo,
  isKo,
  placePiece,
} from "../../helpers/helpers";
import {
  BoardMatrix,
  Coordinates,
  Groups,
  PieceColor,
  Points,
} from "../../types/gameTypes";

import Space from "../Space/Space";
import GameDisplay from "../GameDisplay/GameDisplay";

import "./Board.css";

const Board = (): ReactElement => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(
    constructBoardMatrix()
  );
  const [playerTurn, setPlayerTurn] = useState<PieceColor>("B");
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [groups, setGroups] = useState<Groups>({});
  const [komi, setKomi] = useState<Points>({ black: 0, white: 7.5 });
  const [points, setPoints] = useState<Points>({
    black: komi.black,
    white: komi.white,
  });
  const [lastCapturingSpace, setLastCapturingSpace] = useState<Coordinates | null>(null);
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
      const opponentsToCapture: number[] = [];
      const libertiesHere: number = getLibertyCountFromSpaces(
        getSpacesFromMetas(surroundingInfo)
      );
      groupNumbers.opponentGroups.forEach((groupNumber) => {
        if (getLibertyCountForGroup(groups, boardMatrix, groupNumber) === 1) {
          opponentsToCapture.push(groupNumber);
        }
      });
      let newGroups: Groups = {};
      let newBoardMatrix: BoardMatrix = [];
      // If ko (no capture-back rule) is in effect, prevent the move
      if (isKo(groups, opponentsToCapture, lastCapturingSpace)) {
        return;
      }
      // Check if player has groups surrounding the chosen space with enough liberties
      if (
        groupNumbers.myGroups.length > 0 &&
        (groupNumbers.myGroups.some(
          (groupNumber) =>
            getLibertyCountForGroup(groups, boardMatrix, groupNumber) > 1
        ) ||
          libertiesHere > 0)
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
        newBoardMatrix = boardWithPlayerMove.boardMatrix;
        newGroups = boardWithPlayerMove.groups;
      } else if (
        // Check if this space has enough liberties or can capture
        libertiesHere > 0 ||
        opponentsToCapture.length > 0
      ) {
        const boardWithPlayerMove = placePiece(
          boardMatrix,
          groups,
          yx,
          playerTurn
        );
        newBoardMatrix = boardWithPlayerMove.boardMatrix;
        newGroups = boardWithPlayerMove.groups;
      }
      // Capture opponent groups if able
      if (opponentsToCapture.length > 0) {
        const boardWithCaptures = captureGroups(
          newGroups,
          newBoardMatrix,
          opponentsToCapture
        );
        setLastCapturingSpace(yx);
        newBoardMatrix = boardWithCaptures.boardMatrix;
        newGroups = boardWithCaptures.groups;
        setPoints(addPoints(points, playerTurn, boardWithCaptures.points));
      } else {
        setLastCapturingSpace(null);
      }
      if (newBoardMatrix.length !== 0 && Object.keys(newGroups).length !== 0) {
        setBoardMatrix(newBoardMatrix);
        setGroups(newGroups);
        endTurn();
      }
    }
  };

  return (
    <div className='Board-Container'>
      <GameDisplay
        points={points}
        playerTurn={playerTurn}
        komi={komi}
        setKomi={setKomi}
      />
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
                  playerTurn={playerTurn}
                />
              ))}
            </div>
          ))}
      </div>
      <button onClick={() => setShowDebug(!showDebug)}>{`${
        showDebug ? "Hide" : "Show"
      } Debug Overlay`}</button>
    </div>
  );
};

export default Board;
