"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Usepetcontext } from "@/lib/hooks";
import { addPet } from "../actions/action";
import PetBtn from "./pet-form-btn";
import { toast } from "sonner";

type petformprops = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};
function Petform({ actionType, onFormSubmission }: petformprops) {
  const { currentpet } = Usepetcontext();

  return (
    <form
      action={async (formData) => {
        const error = await addPet(formData);
        if (error) {
          toast.error(error.message);
          return;
        }
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={actionType === "edit" ? currentpet?.name : " "}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownername">Owner Name</Label>
          <Input
            id="ownername"
            name="ownerName"
            type="text"
            defaultValue={actionType === "edit" ? currentpet?.ownerName : " "}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={
              actionType === "edit" ? currentpet?.imageUrl ?? "" : ""
            }
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            defaultValue={actionType === "edit" ? currentpet?.age : " "}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={actionType === "edit" ? currentpet?.notes : " "}
            rows={3}
          ></Textarea>
        </div>
      </div>
      <PetBtn actionType={actionType} />
    </form>
  );
}

export default Petform;
