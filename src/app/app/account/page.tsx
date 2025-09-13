import { auth } from "@/lib/auth-no-edge";
import { checkauth } from "@/lib/server-utils";
import ContentBlock from "@/src/components/content-block";
import H1 from "@/src/components/h1";
import Signoutbtn from "@/src/components/sign-out-btn";
import { redirect } from "next/navigation";

async function Page() {
  const session = await checkauth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>your account details {session?.user?.email}</p>
        <Signoutbtn />
      </ContentBlock>
    </main>
  );
}

export default Page;
