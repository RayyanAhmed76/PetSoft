import { cn } from "@/lib/utils";

type Contentblockprops = {
  children: React.ReactNode;
  className?: string;
};

function ContentBlock({ children, className }: Contentblockprops) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm overflow-hidden rounded-md h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
