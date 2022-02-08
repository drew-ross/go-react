import { ReactElement } from "react";
import { PieceColor, Points } from "../../types/gameTypes";

import "./GameDisplay.css";

interface GameDisplayProps {
  points: Points;
  playerTurn: PieceColor;
  komi: Points;
  setKomi: (komi: Points) => void;
}

const GameDisplay = (props: GameDisplayProps): ReactElement => {
  const { points, playerTurn } = props;

  return (
    <div className='GameDisplay'>
      <p>Turn: {playerTurn === "B" ? "Black" : "White"}</p>
      <p>Black: <span id="points-black">{points.black}</span></p>
      <p>White: <span id="points-white">{points.white}</span></p>
    </div>
  );
};

export default GameDisplay;
