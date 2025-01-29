import React, { useEffect, useRef, useState, useCallback } from "react";

function GameScreen() {
  const canvasRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const [jumping, setJumping] = useState(false);
  const [playerY, setPlayerY] = useState(200);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 2;
  const jumpHeight = -25;
  const playerX = 50;

  useEffect(() => {
    // 📌 Load background image
    const backgroundImage = new Image();
    backgroundImage.src = "/assets/lava-rock.png";

    backgroundImage.onload = () => {
      backgroundImageRef.current = backgroundImage;
      console.log("Imagen de fondo cargada OK!");
    };

    backgroundImage.onerror = () => {
      console.error("Error al cargar la imagen de fondo...");
    };
  });

  // 🎮 Game configuration
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    let animationFrameId;
    let backgroundX = 0;

    const update = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 🔥 Draw the background in movement
      if (backgroundImageRef.current) {
        context.drawImage(
          backgroundImageRef.current,
          backgroundX,
          0,
          canvas.width,
          canvas.height
        );
        context.drawImage(
          backgroundImageRef.current,
          backgroundX + canvas.width,
          0,
          canvas.width,
          canvas.height
        );
        backgroundX = (backgroundX - 2) % canvas.width; // Mueve el fondo
      }

      // 🌱 Draw the floor
      context.fillStyle = "#228B22";
      context.fillRect(0, 350, canvas.width, 50);

      // 🔺 Character handling
      if (jumping) {
        setPlayerY((prev) => Math.max(prev + jumpHeight, 0));
        setJumping(false);
      } else if (playerY < 300) {
        setPlayerY((prev) => Math.min(prev + gravity, 300));
      }

      // 🔴 Draw the player
      context.fillStyle = "#FF0000";
      context.fillRect(playerX, playerY, 40, 40);

      // 🚧 Generate new obstacles
      if (Math.random() < 0.01) {
        setObstacles((prev) => [
          ...prev,
          { x: canvas.width, y: 310, width: 40, height: 40 }, // Corregido: "with" -> "width"
        ]);
      }

      // 🎯 Update and draw obstacles
      const updatedObstacles = obstacles.map((obs) => ({
        ...obs,
        x: obs.x - 5,
      }));

      setObstacles(updatedObstacles);

      context.fillStyle = "#000";
      updatedObstacles.forEach((obs) =>
        context.fillRect(obs.x, obs.y, obs.width, obs.height)
      );

      // 💥 Verify collision
      updatedObstacles.forEach((obs) => {
        if (
          playerX < obs.x + obs.width &&
          playerX + 40 > obs.x &&
          playerY < obs.y + obs.height &&
          playerY + 40 > obs.y
        ) {
          setGameOver(true);
        }
      });

      // ⏯ If there is no collision, keep the animation
      if (!gameOver) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        context.fillStyle = "#000";
        context.font = "30px Arial";
        context.fillText("Game Over", canvas.width / 2 - 75, canvas.height / 2);
      }
    };

    // 👇 Play only if the backgroud is loadeds
    if (backgroundImageRef.current) {
      animationFrameId = requestAnimationFrame(update);
    }

    // Clean Up
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameOver, jumpHeight, jumping, obstacles, playerY]); // Solo dependemos de gameOver

  // 🚀 Handle the jump
  const handleKeyDown = useCallback(
    (e) => {
      if (e.code === "Space" && playerY >= 300) {
        setJumping(true);
      }
    },
    [playerY]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      <h1>Hannya Rescue</h1>
      <canvas ref={canvasRef}></canvas>
      {gameOver && (
        <button onClick={() => window.location.reload()}>Restart</button>
      )}
    </div>
  );
}

export default GameScreen;
