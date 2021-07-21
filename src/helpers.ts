import { BoardMatrix, BoardSpace, Coordinates } from "./types/gameTypes";

// Public functions

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  return new Array(size).fill(
    new Array<BoardSpace>(size).fill(["N", null], 0, size), 0, size);
};

// Get value and group info for 4 surrounding spaces
export const getSurroundingInfo = (boardMatrix: BoardMatrix, space: Coordinates) => {
  const surroundingInfo = [];
  surroundingInfo.push(getSpaceInfo(boardMatrix, [space[0] - 1, space[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [space[0], space[1] + 1]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [space[0] + 1, space[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [space[0], space[1] - 1]));
  return surroundingInfo;
}

// Private functions

const getSpaceInfo = (boardMatrix: BoardMatrix, space: Coordinates) => {
  try {
    return boardMatrix[space[0]][space[1]];
  } catch {
    return undefined;
  }
}
