import React from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import WatchTv from "./screens/WatchTv";
import WatchMovie from "./screens/WatchMovie";

function App() {
  const userExists = useSelector((state) => state.user.value);
  return (
    <div className="app">
      <Toaster />
      <Router>
        {!userExists.email ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/movie/:id" element={<WatchMovie />} />
            <Route path="/tv/:id" element={<WatchTv />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
