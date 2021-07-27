// Board spaces can be empty (N for null or no piece),
// have a black piece (B)
// or a white piece (W)
export type BoardSpace = ["N" | PieceColor | null, number | null];

export type PieceColor = "B" | "W";

export type BoardMatrix = BoardSpace[][];

export type Coordinates = [number, number];

export type Groups = { [key: number]: Coordinates[] };

export interface MetaSpace {
  space: BoardSpace;
  yx: Coordinates;
}
