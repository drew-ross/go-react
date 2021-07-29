import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from "../constants/constants";
import {
  BoardMatrix,
  BoardSpace,
  Coordinates,
  Groups,
  MetaSpace,
  PieceColor,
  Points,
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

// Checks the surrounding spaces for number of empty spaces, aka "liberties"
export const getLibertyCountForGroup = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumber: number
): number => {
  let count = 0;
  const checkedSpaces = new Set();
  // Get info for spaces surrounding the group
  groups[groupNumber]?.forEach((yx) => {
    const surroundingInfo = getSurroundingInfo(boardMatrix, yx);
    surroundingInfo.forEach((metaSpace) => {
      // Check set for coordinates to ensure no double-counting
      if (!checkedSpaces.has(String(metaSpace.yx))) {
        checkedSpaces.add(String(metaSpace.yx));
        // If empty, add to count
        if (metaSpace.space[0] === "N") {
          count += 1;
        }
      }
    });
  });
  return count;
};

export const getLibertyCountFromSpaces = (spaces: BoardSpace[]): number => {
  let count = 0;
  spaces.forEach((space) => {
    if (space[0] === "N") {
      count += 1;
    }
  });
  return count;
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

// Get space info and yx coordinates for 4 surrounding spaces
export const getSurroundingInfo = (
  boardMatrix: BoardMatrix,
  [y, x]: Coordinates
): MetaSpace[] => {
  const metaSpaces: MetaSpace[] = [];
  const above: Coordinates = [y - 1, x];
  const right: Coordinates = [y, x + 1];
  const below: Coordinates = [y + 1, x];
  const left: Coordinates = [y, x - 1];
  metaSpaces.push({
    space: getSpaceInfo(boardMatrix, above) || [null, null],
    yx: above,
  });
  metaSpaces.push({
    space: getSpaceInfo(boardMatrix, right) || [null, null],
    yx: right,
  });
  metaSpaces.push({
    space: getSpaceInfo(boardMatrix, below) || [null, null],
    yx: below,
  });
  metaSpaces.push({
    space: getSpaceInfo(boardMatrix, left) || [null, null],
    yx: left,
  });
  return metaSpaces;
};

// Remove coordinate info from MetaSpace[]
export const getSpacesFromMetas = (metaSpaces: MetaSpace[]): BoardSpace[] => {
  return metaSpaces.map((metaSpace) => metaSpace.space);
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
  groupNumber: number | null
): BoardMatrix => {
  const mutableBoardMatrix = createMutableBoardMatrix(boardMatrix);
  yxs.forEach(([y, x]) => {
    mutableBoardMatrix[y][x][1] = groupNumber;
  });
  return mutableBoardMatrix as BoardMatrix;
};

// Reset space to default value
export const resetSpaces = (
  boardMatrix: BoardMatrix,
  yxs: Coordinates[]
): BoardMatrix => {
  const mutableBoardMatrix = createMutableBoardMatrix(boardMatrix);
  yxs.forEach(([y, x]) => {
    mutableBoardMatrix[y][x] = ["N", null];
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
  let newGroups = addSpacesToGroup(groups, spacesToChange, lowestGroup);
  newGroups = removeGroups(newGroups, otherGroups);
  return {
    boardMatrix: newBoardMatrix,
    groups: newGroups,
    groupNumber: lowestGroup,
  };
};

// Remove captured groups from board and return new board and points earned
export const captureGroups = (
  groups: Groups,
  boardMatrix: BoardMatrix,
  groupNumbers: number[]
): {
  boardMatrix: BoardMatrix;
  groups: Groups;
  points: number;
} => {
  const newGroups = removeGroups(groups, groupNumbers);
  let mutableBoardMatrix = createMutableBoardMatrix(boardMatrix);
  let points = 0;
  groupNumbers.forEach((groupNumber) => {
    mutableBoardMatrix = resetSpaces(mutableBoardMatrix, groups[groupNumber]);
    points += groups[groupNumber].length;
  });
  return {
    boardMatrix: mutableBoardMatrix,
    groups: newGroups,
    points,
  };
};

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
  spaces: (BoardSpace | undefined)[],
  myColor: PieceColor
): { myGroups: number[]; opponentGroups: number[] } => {
  const matchingGroups = {
    myGroups: [] as number[],
    opponentGroups: [] as number[],
  };
  const opponentColor = myColor === "B" ? "W" : "B";
  spaces.forEach((space) => {
    if (space !== undefined && typeof space[1] === typeof Number()) {
      if (space[0] === myColor) {
        matchingGroups.myGroups.push(space[1] as number);
      } else if (space[0] === opponentColor) {
        matchingGroups.opponentGroups.push(space[1] as number);
      }
    }
  });
  return matchingGroups;
};

export const createMutableBoardMatrix = (
  boardMatrix: BoardMatrix
): BoardMatrix => {
  return boardMatrix.map((y) => {
    return y.map((x) => {
      return x.map((z) => {
        return z;
      });
    });
  }) as BoardMatrix;
};

export const addPoints = (
  points: Points,
  playerTurn: PieceColor,
  add: number
): Points => {
  return {
    black: playerTurn === "B" ? points.black + add : points.black,
    white: playerTurn === "W" ? points.white + add : points.white,
  };
};
