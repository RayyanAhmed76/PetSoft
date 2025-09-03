import AuthForm from "@/src/components/auth-form";
import H1 from "@/src/components/h1";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <>
      <div>
        <H1 className="text-center">Sign Up</H1>
      </div>
      <AuthForm />
      <Button className="mt-3">Sign Up</Button>
      <p className="text-zinc-600 mt-4 text-md font-semibold">
        Already have an account?
        <Link className="text-zinc-500 mt-6 text-md" href={"/login"}>
          Log In
        </Link>
      </p>
    </>
  );
}

export default Page;
