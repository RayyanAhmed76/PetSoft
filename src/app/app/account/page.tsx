import ContentBlock from "@/src/components/content-block";
import H1 from "@/src/components/h1";

function Page() {
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>your account details ...</p>
      </ContentBlock>
    </main>
  );
}

export default Page;
