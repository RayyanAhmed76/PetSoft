"use client";

import React from "react";
import { Button } from "./ui/button";
import { signout } from "../actions/action";

function Signoutbtn() {
  return <Button onClick={async () => await signout()}>Signout</Button>;
}

export default Signoutbtn;
