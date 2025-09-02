"use client";

import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { addPet, deletePet, editPet } from "../actions/action";
import { toast } from "sonner";
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
  addpethandler: (newPet: Omit<Pet, "id">) => Promise<void>;
  handlepetedit: (petid: string, newpetdata: Omit<Pet, "id">) => void;
};

export const Petcontext = createContext<Tpetcontext | null>(null);
export default function PetContextProvider({
  data,
  children,
}: petcontextprovideprops) {
  const [petid, setpetid] = useState<string | null>(null);
  const [optimisticpet, setoptimisticpet] = useOptimistic(
    data,
    (state, newpetdata) => {
      return [
        ...state,
        {
          ...newpetdata,
          id: Math.random().toString(),
        },
      ];
    }
  );

  const noofpets = optimisticpet.length;

  const currentpet = optimisticpet.find((pet) => pet.id === petid);

  const addpethandler = async (newPet: Omit<Pet, "id">) => {
    setoptimisticpet(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet added successfully!");
  };

  const handlepetedit = async (petid: string, newpetdata: Omit<Pet, "id">) => {
    const error = await editPet(currentpet?.id, newpetdata);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet updated successfully!");
  };

  const handlecheckoutbutton = async (id: string) => {
    const error = await deletePet(id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet deleted successfully!");
  };

  const handlechangeselectedpetid = (id: string) => {
    setpetid(id);
  };

  return (
    <Petcontext.Provider
      value={{
        pets: optimisticpet,
        petid,
        handlechangeselectedpetid,
        currentpet,
        noofpets,
        handlecheckoutbutton,
        addpethandler,
        handlepetedit,
      }}
    >
      {children}
    </Petcontext.Provider>
  );
}
