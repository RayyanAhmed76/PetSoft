"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Usepetcontext } from "@/lib/hooks";
import PetBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defautPetImage } from "@/lib/constant-image-pet";
import { petformvalidation, TpetForm } from "@/lib/validation";

type petformprops = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function Petform({ actionType, onFormSubmission }: petformprops) {
  const { currentpet, addpethandler, handlepetedit } = Usepetcontext();
  const {
    register,
    getValues,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<TpetForm>({
    resolver: zodResolver(petformvalidation) as any,
    defaultValues:
      actionType === "edit"
        ? {
            name: currentpet?.name,
            ownerName: currentpet?.ownerName,
            imageUrl: currentpet?.imageUrl,
            age: currentpet?.age,
            notes: currentpet?.notes,
          }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        const petdata = getValues();
        petdata.imageUrl = petdata.imageUrl || defautPetImage;

        if (actionType === "add") {
          await addpethandler(petdata);
        } else if (actionType === "edit") {
          await handlepetedit(currentpet!.id, petdata);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")}></Input>
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input id="imageUrl" {...register("imageUrl")}></Input>
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")}></Input>
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")}></Textarea>
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetBtn actionType={actionType} />
    </form>
  );
}

export default Petform;
