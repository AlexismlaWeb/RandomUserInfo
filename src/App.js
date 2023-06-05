import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import UserProfilScreen from "./UserProfilScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={HomeScreen} />
        <Route exact path="/UserProfil" Component={UserProfilScreen} />
      </Routes>
    </Router>
  );
}

export default App;
