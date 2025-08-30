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
  handlecheckoutbutton: (id: string) => void;
  addpethandler: (newPet: Omit<Pet, "id">) => void;
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

  const addpethandler = (newPet: Omit<Pet, "id">) => {
    setpets((prev) => [
      ...prev,
      {
        ...newPet,
        id: Date.now().toString(),
      },
    ]);
  };

  const handlecheckoutbutton = (id: string) => {
    setpets((prev) => prev.filter((pet) => pet.id !== id));
    setpetid(null);
  };

  const handlechangeselectedpetid = (id: string) => {
    setpetid(id);
  };

  return (
    <Petcontext.Provider
      value={{
        pets,
        petid,
        handlechangeselectedpetid,
        currentpet,
        noofpets,
        handlecheckoutbutton,
        addpethandler,
      }}
    >
      {children}
    </Petcontext.Provider>
  );
}
