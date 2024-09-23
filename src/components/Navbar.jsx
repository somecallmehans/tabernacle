import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Leaderboard", to: "/leaderboard" },
  { name: "Achievements", to: "/achievements" },
  { name: "Login", to: "/login" },
];

export default function Navbar() {
  return (
    <nav className="container flex flex-wrap p-5 flex-col">
      <div className="flex flex-wrap items-center text-base">
        {navLinks.map(({ name, to }) => (
          <Link className="mr-5" to={to}>
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
