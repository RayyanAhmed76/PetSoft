import React from "react";
import { Button } from "./ui/button";
import { useFormState, useFormStatus } from "react-dom";

function PetBtn(actionType) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={"default"} className="mt-5 self-end">
      {" "}
      {actionType === "add" ? "Add a new Pet" : "Save changes"}
    </Button>
  );
}

export default PetBtn;
