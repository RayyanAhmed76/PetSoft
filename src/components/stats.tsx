"use client";
import { Usepetcontext } from "@/lib/hooks";

function Stats() {
  const { noofpets } = Usepetcontext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{noofpets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}

export default Stats;
