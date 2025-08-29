import { Petcontext } from "@/src/context/pet-context";
import { useContext } from "react";

export function Usepetcontext() {
  const context = useContext(Petcontext);
  if (!context) {
    throw new Error("context not avaliable");
  }

  return context;
}
