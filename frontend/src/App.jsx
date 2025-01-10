import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./HomePage";
import CreateMovie from "./CreateMovie";
import SingleMovie from "./SingleMovie";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-movie" element={<CreateMovie />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
