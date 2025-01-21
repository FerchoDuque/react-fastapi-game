import { useEffect, useRef } from "react";

function GameScreen() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let isJumping = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // dibujar al perrito y obstaculos...
      requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(draw);
  }, []);

  return <canvas ref={canvasRef} width={800} height={400}></canvas>;
}

export default GameScreen;
