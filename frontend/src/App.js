import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./components/StartScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
