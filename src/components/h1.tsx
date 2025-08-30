import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type H1props = {
  children: React.ReactNode;
  className?: string;
};

function H1({ children, className }: H1props) {
  return (
    <h1 className={cn("font-semibold text-2xl", className)}>{children}</h1>
  );
}

export default H1;
