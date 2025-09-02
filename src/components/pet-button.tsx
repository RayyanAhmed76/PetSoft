"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Petform from "./pet-form";
import { flushSync } from "react-dom";

type Petbuttonprops = {
  actionType: "edit" | "checkout" | "add";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function Petbutton({
  actionType,
  children,
  onClick,
  disabled,
}: Petbuttonprops) {
  const [isformopen, setisformopen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button onClick={onClick} disabled={disabled} variant={"secondary"}>
        {children}
      </Button>
    );
  }
  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isformopen} onOpenChange={setisformopen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size="icon">
              <PlusIcon className="h-7 w-7" />
            </Button>
          ) : (
            <Button variant={"secondary"}>{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "add" ? "Add a new pet" : "Edit Pet"}
            </DialogTitle>
          </DialogHeader>
          <Petform
            actionType={actionType}
            onFormSubmission={() => {
              flushSync(() => {
                setisformopen(false);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default Petbutton;
