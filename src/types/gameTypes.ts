/* BoardSpaces have information about the space in the form of
[spaceColor, groupNumber]
Board spaces can be empty (N), have a black piece (B) or a white piece (W).
null values for spaceColor are for spaces which can't be found
null values for groupNumber are for (N) spaces that don't belong to a group
All (B) or (W) spaces should also have a group number, even if they are alone
*/ 
export type BoardSpace = ["N" | PieceColor | null, number | null];

export type PieceColor = "B" | "W";

export type BoardMatrix = BoardSpace[][];

export type Coordinates = [number, number];

export type Groups = { [key: number]: Coordinates[] };

export interface MetaSpace {
  space: BoardSpace;
  yx: Coordinates;
}
