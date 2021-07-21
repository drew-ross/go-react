import {
  BoardMatrix,
  BoardSpace,
  Coordinates,
  PieceColor,
} from "./types/gameTypes";

// Public functions

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  return new Array(size).fill(
    new Array<BoardSpace>(size).fill(["N", null], 0, size),
    0,
    size
  );
};

// Place a piece for the current player if the space is empty
export const placePiece = (
  boardMatrix: BoardMatrix,
  yx: Coordinates,
  playerTurn: PieceColor,
  onSuccessCb: () => void
): BoardMatrix => {
  return boardMatrix.map((row, y) => {
    if (yx[0] === y) {
      return row.map((space, x) => {
        if (yx[1] === x && space[0] === "N") {
          onSuccessCb();
          return [playerTurn, null];
        } else {
          return space;
        }
      });
    } else {
      return row;
    }
  });
};

// Get value and group info for 4 surrounding spaces
export const getSurroundingInfo = (
  boardMatrix: BoardMatrix,
  yx: Coordinates
) => {
  const surroundingInfo = [];
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] - 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] + 1]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] + 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] - 1]));
  return surroundingInfo;
};

// Private functions

const getSpaceInfo = (boardMatrix: BoardMatrix, yx: Coordinates) => {
  try {
    return boardMatrix[yx[0]][yx[1]];
  } catch {
    return undefined;
  }
};
