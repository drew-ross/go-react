import {
  BoardMatrix,
  BoardSpace,
  Coordinates,
  Groups,
  PieceColor,
} from "./types/gameTypes";

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  return new Array(size).fill(
    new Array<BoardSpace>(size).fill(["N", null], 0, size),
    0,
    size
  );
};

// Check if a space is empty (contains "N")
export const checkEmpty = (
  boardMatrix: BoardMatrix,
  yx: Coordinates
): boolean => {
  const thisSpace = getSpaceInfo(boardMatrix, yx);
  return thisSpace !== undefined && thisSpace[0] === "N";
};

// Checks the surrounding 4 spaces for number of empty spaces, aka "liberties"
export const getLibertyCount = (
  boardMatrix: BoardMatrix,
  yx: Coordinates
): number => {
  const surroundingInfo = getSurroundingInfo(boardMatrix, yx);
  let num = 0;
  surroundingInfo.forEach((space) => {
    if (space && space[0] === "N") {
      num += 1;
    }
  });
  return num;
};

// Add piece to space and return new boardMatrix
export const placePiece = (
  boardMatrix: BoardMatrix,
  yx: Coordinates,
  pieceColor: PieceColor
): BoardMatrix => {
  return boardMatrix.map((row, y) => {
    if (yx[0] === y) {
      return row.map((space, x) => {
        if (yx[1] === x) {
          return [pieceColor, null];
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
): Array<BoardSpace | undefined> => {
  const surroundingInfo = [];
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] - 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] + 1]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0] + 1, yx[1]]));
  surroundingInfo.push(getSpaceInfo(boardMatrix, [yx[0], yx[1] - 1]));
  return surroundingInfo;
};

// Get value and group info for a space
export const getSpaceInfo = (
  boardMatrix: BoardMatrix,
  yx: Coordinates
): BoardSpace | undefined => {
  try {
    return boardMatrix[yx[0]][yx[1]];
  } catch {
    return undefined;
  }
};

export const createGroup = (groups: Groups) => {};

export const addToGroup = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumber: number,
  yx: Coordinates
) => {};

export const combineGroups = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumbers: Array<number>
) => {};

export const captureGroups = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumbers: Array<number>
) => {};
