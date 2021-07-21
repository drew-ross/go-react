import { BoardMatrix, BoardSpace, Coordinates } from "./types/gameTypes";

// Public functions

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  return new Array(size).fill(
    new Array<BoardSpace>(size).fill(["N", null], 0, size), 0, size);
};

// Get value and group info for 4 surrounding spaces
export const getSurroundingInfo = (boardMatrix: BoardMatrix, yx: Coordinates) => {
  const surroundingInfo = [];
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] - 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] + 1]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] + 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] - 1]));
  return surroundingInfo;
}

// Private functions

const getSpaceInfo = (boardMatrix: BoardMatrix, yx: Coordinates) => {
  try {
    return boardMatrix[yx[0]][yx[1]];
  } catch {
    return undefined;
  }
}
