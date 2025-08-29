"use client";
import { createContext, useState } from "react";
type searchprovideprops = {
  children: React.ReactNode;
};

type Tsearchcontext = {
  searchquery: string;
  handlechangesearchquery: (newValue: string) => void;
};

export const Searchcontext = createContext<Tsearchcontext | null>(null);
export default function SearchContextProvider({
  children,
}: searchprovideprops) {
  const [searchquery, setsearchquery] = useState("");

  const handlechangesearchquery = (newValue: string) => {
    setsearchquery(newValue);
  };

  return (
    <Searchcontext.Provider value={{ searchquery, handlechangesearchquery }}>
      {children}
    </Searchcontext.Provider>
  );
}
