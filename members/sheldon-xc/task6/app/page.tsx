import { title } from "@/components/primitives";
import Swap from "@/components/swap";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>OpenBuild&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>UNISWAP&nbsp;</h1>
      </div>
      <Swap />
    </section>
  );
}
