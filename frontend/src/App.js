import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import LoginScreen from "./components/LoginScreen";
import ResultScreen from "./components/ResultScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/results" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
