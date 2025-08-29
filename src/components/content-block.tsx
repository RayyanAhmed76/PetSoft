function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F7F8FA] shadow-sm overflow-hidden rounded-md h-full w-full">
      {children}
    </div>
  );
}

export default ContentBlock;
