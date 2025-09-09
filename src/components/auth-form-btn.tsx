"use client";

import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type authformbtnprops = {
  type: "login" | "signup";
};

function AuthFormBtn({ type }: authformbtnprops) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="mt-3">
      {type === "login" ? "login" : "signup"}
    </Button>
  );
}

export default AuthFormBtn;
