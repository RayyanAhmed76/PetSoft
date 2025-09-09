"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "../actions/action";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

type authformprops = {
  type: "signup" | "login";
};

function AuthForm({ type }: authformprops) {
  const [signupError, dispatchsignup] = useFormState(signUp, undefined);
  const [loginError, dispatchlogin] = useFormState(logIn, undefined);
  return (
    <form
      action={
        type === "login"
          ? (dispatchlogin as unknown as (formData: FormData) => Promise<void>)
          : (dispatchsignup as unknown as (formData: FormData) => Promise<void>)
      }
      className="space-y-3"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          required
          maxLength={100}
        ></Input>
      </div>
      <div className="space-y-1">
        <Label className="space-y-1" htmlFor="password">
          password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={50}
        ></Input>
      </div>
      <AuthFormBtn type={type} />
      {signupError && (
        <h1 className="text-red-500 text-sm mt-2">{signupError.message}</h1>
      )}
      {loginError && (
        <h1 className="text-red-500 text-sm mt-2">{loginError.message}</h1>
      )}
    </form>
  );
}

export default AuthForm;
