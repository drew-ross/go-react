import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from "../constants/constants";
import {
  BoardMatrix,
  BoardSpace,
  Coordinates,
  Groups,
  PieceColor,
} from "../types/gameTypes";

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  if (
    typeof size !== typeof Number() ||
    size < BOARD_SIZE_MIN ||
    size > BOARD_SIZE_MAX
  ) {
    size = 19;
  }
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
export const getLibertyCount = (surroundingInfo: BoardSpace[]): number => {
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
  groups: Groups,
  yx: Coordinates,
  pieceColor: PieceColor,
  groupNumber: number | null = null
): { boardMatrix: BoardMatrix; groups: Groups } => {
  let newGroups = groups;
  if (groupNumber === null) {
    const newGroup = createGroup(groups);
    groupNumber = newGroup.added;
    newGroups = newGroup.groups;
  }
  const newBoardMatrix = boardMatrix.map((row, y) => {
    if (yx[0] === y) {
      return row.map((space, x) => {
        if (yx[1] === x) {
          return [pieceColor, groupNumber];
        } else {
          return space;
        }
      });
    } else {
      return row;
    }
  });
  const updatedGroups = addSpacesToGroup(
    newGroups,
    [yx],
    groupNumber as number
  );
  return { boardMatrix: newBoardMatrix as BoardMatrix, groups: updatedGroups };
};

// Get value and group info for 4 surrounding spaces
export const getSurroundingInfo = (
  boardMatrix: BoardMatrix,
  yx: Coordinates
): (BoardSpace | undefined)[] => {
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

// Create a new group, return [new groups object, new group number]
export const createGroup = (
  groups: Groups
): { groups: Groups; added: number | null } => {
  for (let i = 0; i < 1000; i++) {
    if (!groups.hasOwnProperty(i)) {
      return { groups: { ...groups, [i]: [] }, added: i };
    }
  }
  return { groups, added: null };
};

// Change space group number in boardMatrix, return new boardMatrix
export const updateSpacesGroup = (
  boardMatrix: BoardMatrix,
  yxs: Coordinates[],
  groupNumber: number
): BoardMatrix => {
  const mutableBoardMatrix = boardMatrix.map((y) => {
    return y.map((x) => {
      return x.map((z) => {
        return z;
      });
    });
  });
  yxs.forEach(([y, x]) => {
    mutableBoardMatrix[y][x][1] = groupNumber;
  });
  return mutableBoardMatrix as BoardMatrix;
};

// Add space coordinates to groups, return new groups
export const addSpacesToGroup = (
  groups: Groups,
  yxs: Coordinates[],
  groupNumber: number | undefined
): Groups => {
  if (groupNumber !== undefined && groups.hasOwnProperty(groupNumber)) {
    const newGroups: Groups = {};
    for (let key in groups) {
      if (Number(key) === groupNumber) {
        newGroups[Number(key)] = [...groups[key], ...yxs];
      } else {
        newGroups[Number(key)] = groups[key];
      }
    }
    return newGroups;
  } else {
    return groups;
  }
};

export const combineGroups = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumbers: number[]
): { boardMatrix: BoardMatrix; groups: Groups; groupNumber: number } => {
  const lowestGroup: number = Math.min(...groupNumbers);
  const otherGroups: number[] = groupNumbers.filter(
    (num) => num !== lowestGroup
  );
  const spacesToChange: Coordinates[] = [];
  otherGroups.forEach((groupNumber) => {
    groups[groupNumber].forEach((yx) => {
      spacesToChange.push(yx);
    });
  });
  const newBoardMatrix = updateSpacesGroup(
    boardMatrix,
    spacesToChange,
    lowestGroup
  );
  let newGroups = removeGroups(groups, otherGroups);
  newGroups = addSpacesToGroup(groups, spacesToChange, lowestGroup);
  return {
    boardMatrix: newBoardMatrix,
    groups: newGroups,
    groupNumber: lowestGroup,
  };
};

export const captureGroups = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumbers: number[]
) => {};

// Removes a group from the groups object only
export const removeGroups = (
  groups: Groups,
  groupNumbers: number[]
): Groups => {
  const newGroups: Groups = {};
  for (let key in groups) {
    if (!groupNumbers.includes(Number(key))) {
      newGroups[Number(key)] = groups[Number(key)];
    }
  }
  return newGroups;
};

export const getMatchingGroups = (
  surroundingInfo: (BoardSpace | undefined)[],
  pieceColor: PieceColor
): number[] => {
  const matchingGroups: number[] = [];
  surroundingInfo.forEach((space) => {
    if (
      space !== undefined &&
      space[0] === pieceColor &&
      typeof space[1] === typeof Number()
    ) {
      matchingGroups.push(space[1] as number);
    }
  });
  return matchingGroups;
};
