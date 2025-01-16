import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
