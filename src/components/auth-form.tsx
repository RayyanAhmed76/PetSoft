import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "../actions/action";

type authformprops = {
  type: "signup" | "login";
};

function AuthForm({ type }: authformprops) {
  return (
    <form action={type === "login" ? logIn : signUp} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text"></Input>
      </div>
      <div className="space-y-1">
        <Label className="space-y-1" htmlFor="password">
          password
        </Label>
        <Input id="password" name="password" type="password"></Input>
      </div>
      <Button className="mt-3">{type === "login" ? "login" : "signup"}</Button>
    </form>
  );
}

export default AuthForm;
