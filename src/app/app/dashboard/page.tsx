import Branding from "@/src/components/branding";
import ContentBlock from "@/src/components/content-block";
import Petbutton from "@/src/components/pet-button";
import PetDetails from "@/src/components/Pet-details";
import PetList from "@/src/components/Pet-list";
import SearchForm from "@/src/components/search-form";

import Stats from "@/src/components/stats";

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
            <div className="absolute right-4 bottom-4">
              <Petbutton actionType="add" />
            </div>
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
