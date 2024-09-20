import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/achievements">Achievements</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
