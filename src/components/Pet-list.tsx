"use client";
import { Usepetcontext } from "@/lib/hooks";
import Image from "next/image";

function PetList() {
  const { pets } = Usepetcontext();
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button className="flex h-[70px] w-full cursor-pointer items-center px-5 gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] text-base transition">
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
