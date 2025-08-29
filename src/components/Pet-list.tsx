"use client";
import { Usepetcontext, usesearchcontext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

function PetList() {
  const { pets, petid, handlechangeselectedpetid } = Usepetcontext();
  const { searchquery } = usesearchcontext();

  const filteredpets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchquery)
  );
  return (
    <ul className="bg-white border-b border-light">
      {filteredpets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handlechangeselectedpetid(pet.id)}
            className={cn(
              "flex h-[70px] w-full cursor-pointer items-center px-5 gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] text-base transition",
              {
                "bg-[#EFF1F2]": petid === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="pet picture"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PetList;
