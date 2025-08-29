"use client";
import { usesearchcontext } from "@/lib/hooks";

function SearchForm() {
  const { searchquery, handlechangesearchquery } = usesearchcontext();
  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/20 outline-none focus:bg-white/50 hover:bg-white/30  rounded-lg px-5 py-3 placeholder:text-white/50"
        placeholder="search pets here "
        type="search"
        value={searchquery}
        onChange={(e) => {
          handlechangesearchquery(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchForm;
