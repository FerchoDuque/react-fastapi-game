import React from "react";

const StartScreen = ({ onStartGame }) => {
  return (
    <div>
      <h1>¡El reto del inspector!!!</h1>
      <button onClick={onStartGame}>Comenzar Juego!</button>
    </div>
  );
};

export default StartScreen;
