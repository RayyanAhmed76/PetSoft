import Logo from "@/src/components/logo";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 min-h-screen">
      <Logo />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
