import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from "../helpers/authHelpers";
import LoginPopover from "./LoginPopover";

const navLinks = [
  { id: 1, name: "Home", to: "/", admin: false },
  { id: 2, name: "Leaderboard", to: "/leaderboard", admin: false },
  { id: 3, name: "Achievements", to: "/achievements", admin: false },
  { id: 4, name: "CRUD Stuff", to: "/crud", admin: true },
  {
    id: 5,
    name: "New League Session",
    to: "/league-session",
    admin: true,
  },
];

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!auth.getToken());

  return (
    <nav className="container flex p-5 bg-slate-200 max-w-full">
      <div className="flex items-center text-base">
        {navLinks
          .filter((link) => !link.admin || (link.admin && loggedIn))
          .map(({ id, name, to }) => (
            <NavLink key={id} className="mr-5" to={to}>
              {name}
            </NavLink>
          ))}
      </div>
      <div className="flex-grow" />
      <LoginPopover loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </nav>
  );
}
