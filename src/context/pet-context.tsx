"use client";

import { Pet } from "@/lib/types";
import { createContext, useState } from "react";
type petcontextprovideprops = {
  data: Pet[];
  children: React.ReactNode;
};

type Tpetcontext = {
  pets: Pet[];
  petid: string | null;
};

export const Petcontext = createContext<Tpetcontext | null>(null);
export default function PetContextProvider({
  data,
  children,
}: petcontextprovideprops) {
  const [pets, setpets] = useState(data);
  const [petid, setpetid] = useState(null);

  return (
    <Petcontext.Provider value={{ pets, petid }}>
      {children}
    </Petcontext.Provider>
  );
}
