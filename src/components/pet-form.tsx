"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Usepetcontext } from "@/lib/hooks";

type petformprops = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};
function Petform({ actionType, onFormSubmission }: petformprops) {
  const { addpethandler, currentpet, handlepetedit } = Usepetcontext();
  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes") as string,
      age: +(formData.get("age") as string),
    };

    if (actionType === "add") {
      addpethandler(pet);
    } else if (actionType === "edit") {
      handlepetedit(currentpet!.id, pet);
    }

    onFormSubmission();
  };
  return (
    <form onSubmit={handleSumbit} className="flex flex-col">
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
          <Label htmlFor="imageurl">Image Url</Label>
          <Input
            id="imageirl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? currentpet?.imageUrl : " "}
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
      <Button variant={"default"} className="mt-5 self-end">
        {" "}
        {actionType === "add" ? "Add a new Pet" : "Save changes"}
      </Button>
    </form>
  );
}

export default Petform;
