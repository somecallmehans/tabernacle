import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@headlessui/react";

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
      <div className="flex items-center text-base">
        <Button
          onClick={() => console.log("click")}
          className="self-end rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        >
          Save changes
        </Button>
      </div>
    </nav>
  );
}
