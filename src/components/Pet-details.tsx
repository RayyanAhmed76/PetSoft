"use client";
import { Usepetcontext } from "@/lib/hooks";
import Image from "next/image";
import Petbutton from "./pet-button";
import { startTransition, useTransition } from "react";
import { Pet } from "@prisma/client";

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
  const { handlecheckoutbutton } = Usepetcontext();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start px-8 py-5 bg-white border-b border-light space-y-4 sm:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Image
          src={pet?.imageUrl ?? "/placeholder.png"}
          alt={"pet logo"}
          width={75}
          height={75}
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <h3 className="font-semibold text-3xl leading-7 text-center sm:text-left">
          {pet?.name}
        </h3>
      </div>

      <div className="flex space-x-3 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-auto justify-center">
        <Petbutton actionType="edit">Edit</Petbutton>
        <Petbutton
          actionType="checkout"
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await handlecheckoutbutton(pet.id);
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
    <div className="flex flex-col sm:flex-row justify-around py-10 px-3 space-y-8 sm:space-y-0">
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
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-4 sm:mx-8 border border-light">
      {pet?.notes}
    </section>
  );
}

export default PetDetails;
