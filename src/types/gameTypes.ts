// Board spaces can be empty (N for null or no piece),
// have a black piece (B)
// or a white piece (W)
export type BoardSpace = "N" | PieceColor;

export type PieceColor = "B" | "W";

export type BoardMatrix = Array<Array<BoardSpace>>;

export type Coordinates = [number, number];
