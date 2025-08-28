"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "dashboard",
    pathname: "/app/dashboard",
  },
  {
    label: "account",
    pathname: "/app/account",
  },
];

function AppHeader() {
  const activepathname = usePathname();
  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-2 px-4 ">
          {routes.map((route) => (
            <li key={route.pathname}>
              <Link
                href={route.pathname}
                className={cn(
                  "text-white/70  rounded-md py-2 px-1 hover:text-white focus:text-white transition",
                  {
                    "bg-black/10": activepathname === route.pathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
