import { BoardMatrix, BoardSpace } from "./types/gameTypes";

export const constructBoardMatrix = (size: number = 19): BoardMatrix => {
  return new Array(size).fill(new Array<BoardSpace>(size).fill("N", 0, size), 0, size);
};
