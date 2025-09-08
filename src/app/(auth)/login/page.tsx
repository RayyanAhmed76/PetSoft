import AuthForm from "@/src/components/auth-form";
import H1 from "@/src/components/h1";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <>
      <div>
        <H1 className="text-center">Log In</H1>
      </div>
      <AuthForm type="login" />

      <p className="text-zinc-600 mt-4 text-md font-semibold">
        Not have an account yet?
        <Link className="text-zinc-500 mt-6 text-sm" href={"/signup"}>
          signup
        </Link>
      </p>
    </>
  );
}

export default Page;
