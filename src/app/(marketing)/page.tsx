import Logo from "@/src/components/logo";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="petsoft logo"
        width={519}
        height={472}
        className="mx-auto xl:mx-0"
      />
      <div className="text-center xl:text-left">
        <Logo className="mx-auto xl:mx-0" />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          use PetSoft to easily keep track of pets under your care.Get life time
          access for $299.
        </p>
        <div className="space-x-3 mt-10 mb-5">
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
