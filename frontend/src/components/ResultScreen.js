import { useNavigate } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Resultados</h1>
      <p>Puntuación: 100</p>

      <button onClick={() => navigate("/")}>Volver al Menú</button>
      <button onClick={() => navigate("/game")}>Jugar de nuevo</button>
    </div>
  );
}

export default ResultScreen;
