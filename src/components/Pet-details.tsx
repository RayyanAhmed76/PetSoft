"use client";
import { Usepetcontext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import Petbutton from "./pet-button";
import { deletePet } from "../actions/action";
import { startTransition, useTransition } from "react";

function PetDetails() {
  const { currentpet } = Usepetcontext();

  return (
    <section className="flex flex-col w-full h-full">
      {!currentpet ? (
        <EmptyView />
      ) : (
        <>
          <Topbar pet={currentpet} />

          <Otherinfo pet={currentpet} />

          <Notes pet={currentpet} />
        </>
      )}
    </section>
  );
}

type prop = {
  pet: Pet;
};

function EmptyView() {
  return (
    <h1 className="font-semibold text-2xl h-full flex justify-center items-center">
      no pet selected
    </h1>
  );
}

function Topbar({ pet }: prop) {
  const [ispending, starttransition] = useTransition();
  return (
    <div className="flex items-center px-8 py-5 bg-white border-b border-light">
      <Image
        src={pet?.imageUrl ?? "/placeholder.png"}
        alt={"pet logo"}
        width={75}
        height={75}
        className="w-[75px] h-[75px] rounded-full object-cover "
      />
      <h3 className="font-semibold text-3xl leading-7 ml-5">{pet?.name}</h3>

      <div className="ml-auto flex space-x-3">
        <Petbutton actionType="edit">Edit</Petbutton>
        <Petbutton
          disabled={ispending}
          actionType="checkout"
          onClick={async () => {
            starttransition(async () => {
              await deletePet(pet?.id);
            });
          }}
        >
          Checkout
        </Petbutton>
      </div>
    </div>
  );
}

function Otherinfo({ pet }: prop) {
  return (
    <div className="flex justify-around py-10 px-3">
      <div className="text-center">
        <h3 className="text-zinc-700 uppercase text-[13px] font-medium">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div className="text-center">
        <h3 className="text-zinc-700 uppercase text-[13px] font-medium">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: prop) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
      {pet?.notes}
    </section>
  );
}

export default PetDetails;
