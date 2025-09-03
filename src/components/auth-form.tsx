import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function AuthForm() {
  return (
    <form className="space-y-3">
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
    </form>
  );
}

export default AuthForm;
