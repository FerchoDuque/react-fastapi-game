import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();

  const guessGame = () => {
    navigate("/game");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>¡Hannya Rescue para la web!!!</h1>
      <button onClick={goToLogin}>Iniciar Sesión</button>
      <button onClick={guessGame}>Jugar como invitado!</button>
    </div>
  );
};

export default StartScreen;
