"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { signout } from "../actions/action";

function Signoutbtn() {
  const [ispending, startTransition] = useTransition();
  return (
    <Button
      disabled={ispending}
      onClick={async () => {
        startTransition(async () => {
          await signout();
        });
      }}
    >
      Signout
    </Button>
  );
}

export default Signoutbtn;
