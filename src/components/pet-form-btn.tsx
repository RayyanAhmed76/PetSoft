import React from "react";
import { Button } from "./ui/button";

type petbtnprops = {
  actionType: "add" | "edit";
};

function PetBtn({ actionType }: petbtnprops) {
  return (
    <Button variant={"default"} className="mt-5 self-end">
      {actionType === "add" ? "Add a new Pet" : "Save changes"}
    </Button>
  );
}

export default PetBtn;
