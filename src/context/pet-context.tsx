"use client";

import { createContext, useOptimistic, useState } from "react";
import { addPet, deletePet, editPet } from "../actions/action";
import { toast } from "sonner";
import { Pet } from "@prisma/client";
import { PetEssentials } from "@/lib/types";
type petcontextprovideprops = {
  data: Pet[];
  children: React.ReactNode;
};

type Tpetcontext = {
  pets: Pet[];
  petid: Pet["id"] | null;
  handlechangeselectedpetid: (id: Pet["id"]) => void;
  currentpet: Pet | undefined;
  noofpets: number;
  handlecheckoutbutton: (id: Pet["id"]) => Promise<void>;
  addpethandler: (newPet: PetEssentials) => Promise<void>;
  handlepetedit: (petid: string, newpetdata: PetEssentials) => Promise<void>;
};

export const Petcontext = createContext<Tpetcontext | null>(null);
export default function PetContextProvider({
  data,
  children,
}: petcontextprovideprops) {
  const [petid, setpetid] = useState<string | null>(null);
  const [optimisticpet, setoptimisticpet] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];

        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.newpetdata } : pet
          );

        case "checkout":
          return state.filter((pet) => pet.id !== payload);

        default:
          return state;
      }
    }
  );

  const noofpets = optimisticpet.length;

  const currentpet = optimisticpet.find((pet) => pet?.id === petid);

  const addpethandler = async (newPet: PetEssentials) => {
    setoptimisticpet({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet added successfully!");
  };

  const handlepetedit = async (petid: Pet["id"], newpetdata: PetEssentials) => {
    setoptimisticpet({ action: "edit", payload: { id: petid, newpetdata } });
    const error = await editPet(currentpet?.id, newpetdata);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet updated successfully!");
  };

  const handlecheckoutbutton = async (id: Pet["id"]) => {
    setoptimisticpet({ action: "checkout", payload: id });
    const error = await deletePet(id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("pet deleted successfully!");
  };

  const handlechangeselectedpetid = (id: Pet["id"]) => {
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
