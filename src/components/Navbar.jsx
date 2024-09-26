import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "@headlessui/react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
} from "@headlessui/react";

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
      <Popover className="relative">
        <PopoverButton
          // onClick={() => console.log("click")}
          className="self-end rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        >
          Save changes
        </PopoverButton>
        <PopoverBackdrop className="fixed inset-0 bg-black/15" />

        <PopoverPanel className="absolute z-10 mt-3 divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out">
          <div className="p-3">
            <a
              className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
              href="#"
            >
              <p className="font-semibold text-black">Insights</p>
              <p className="text-black/50">Measure actions your users take</p>
            </a>
            <a
              className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
              href="#"
            >
              <p className="font-semibold text-black">Automations</p>
              <p className="text-black/50">Create your own targeted content</p>
            </a>
          </div>
        </PopoverPanel>
      </Popover>
    </nav>
  );
}
