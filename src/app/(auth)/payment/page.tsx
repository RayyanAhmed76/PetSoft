"use client";

import { CreateCheckoutSession } from "@/src/actions/action";
import H1 from "@/src/components/h1";
import { Button } from "@/src/components/ui/button";
import React, { useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Payment({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: session, update, status } = useSession();
  const [ispending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <main className="flex flex-col items-center space-y-10">
      <H1>Petsoft access requires payment</H1>

      {searchParams.success && (
        <Button
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
          disabled={status === "loading" || session?.user.hasAccess}
        >
          Access Petsoft
        </Button>
      )}
      {!searchParams.success && (
        <Button
          disabled={ispending}
          onClick={async () => {
            startTransition(async () => {
              await CreateCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}
      {searchParams.success && (
        <p className="text-md text-green-700 mt-5">
          Payment succesfull! Now you have lifetime access to PetSoft
        </p>
      )}
      {searchParams.cancelled && (
        <p className="text-md text-red-500 mt-5">
          Payment cancelled! You can try again!
        </p>
      )}
    </main>
  );
}

export default Payment;
