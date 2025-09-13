import AppFooter from "@/src/components/app-footer";
import AppHeader from "@/src/components/app-header";
import BackgroundPattern from "@/src/components/backgroundpattern";
import PetContextProvider from "@/src/context/pet-context";
import SearchContextProvider from "@/src/context/search-context-provider";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth-no-edge";
import { redirect } from "next/navigation";
import { checkauth, getpetbyuserid } from "@/lib/server-utils";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await checkauth();
  const pets = await getpetbyuserid(session.user.id);
  console.log(pets);
  console.log("session id: " + session.user.id);

  return (
    <>
      <BackgroundPattern />
      <div className=" flex flex-col max-w-[1020px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-center" />
    </>
  );
}

export default Layout;
