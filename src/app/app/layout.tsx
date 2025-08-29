import { Usepetcontext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import AppFooter from "@/src/components/app-footer";
import AppHeader from "@/src/components/app-header";
import BackgroundPattern from "@/src/components/backgroundpattern";
import PetContextProvider from "@/src/context/pet-context";
import SearchContextProvider from "@/src/context/search-context-provider";

async function Layout({ children }: { children: React.ReactNode }) {
  const responce = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!responce.ok) {
    throw new Error("could not fetch pets");
  }
  const data: Pet[] = await responce.json();
  return (
    <>
      <BackgroundPattern />
      <div className=" flex flex-col max-w-[1020px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
}

export default Layout;
