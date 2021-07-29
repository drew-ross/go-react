import { ReactElement } from "react";
import { PieceColor, Points } from "../../types/gameTypes";

interface GameDisplayProps {
  points: Points;
  playerTurn: PieceColor;
  komi: Points;
  setKomi: (komi: Points) => void;
}

const GameDisplay = (props: GameDisplayProps): ReactElement => {
  const { points, playerTurn, komi, setKomi } = props;

  return (
    <div className='GameDisplay'>
      <h2>Turn: {playerTurn === "B" ? "Black" : "White"}</h2>
      <h2>Score:</h2>
      <p>Black: {points.black}</p>
      <p>White: {points.white}</p>
    </div>
  );
};

export default GameDisplay;
