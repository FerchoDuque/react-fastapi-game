import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) navigate("/game");
    else alert("Credenciales Incorrectas!");
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default LoginScreen;
