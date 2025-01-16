import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = ({ onStartGame }) => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  return (
    <div>
      <h1>¡El reto del inspector!!!</h1>
      <button onClick={handleStartGame}>Comenzar Juego!</button>
    </div>
  );
};

export default StartScreen;
