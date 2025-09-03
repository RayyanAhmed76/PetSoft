import { Petcontext } from "@/src/context/pet-context";
import { Searchcontext } from "@/src/context/search-context-provider";
import { useContext } from "react";

export function Usepetcontext() {
  const context = useContext(Petcontext);
  if (!context) {
    throw new Error("context not avaliable");
  }

  return context;
}

export function Usesearchcontext() {
  const context = useContext(Searchcontext);
  if (!context) {
    throw new Error("context not avaliable");
  }

  return context;
}
