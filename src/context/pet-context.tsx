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
  handlechangeselectedpetid: (id: string) => void;
  currentpet: Pet | undefined;
  noofpets: number;
};

export const Petcontext = createContext<Tpetcontext | null>(null);
export default function PetContextProvider({
  data,
  children,
}: petcontextprovideprops) {
  const [pets, setpets] = useState(data);
  const [petid, setpetid] = useState<string | null>(null);

  const noofpets = pets.length;

  const currentpet = pets.find((pet) => pet.id === petid);

  const handlechangeselectedpetid = (id: string) => {
    setpetid(id);
  };

  return (
    <Petcontext.Provider
      value={{ pets, petid, handlechangeselectedpetid, currentpet, noofpets }}
    >
      {children}
    </Petcontext.Provider>
  );
}
