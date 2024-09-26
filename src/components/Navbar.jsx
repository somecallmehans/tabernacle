import React from "react";
import { Link } from "react-router-dom";

import LoginPopover from "./LoginPopover";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Leaderboard", to: "/leaderboard" },
  { name: "Achievements", to: "/achievements" },
];

export default function Navbar() {
  return (
    <nav className="container flex p-5 bg-slate-200 max-w-full">
      <div className="flex items-center text-base">
        {navLinks.map(({ name, to }) => (
          <Link className="mr-5" to={to}>
            {name}
          </Link>
        ))}
      </div>
      <div className="flex-grow" />
      <LoginPopover />
    </nav>
  );
}
