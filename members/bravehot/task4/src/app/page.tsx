import { Header, Listing, Market } from "@/components";
import TotalNum from "@/components/TotalNum";

import { inter } from "@/context/font";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-[1440px] mx-auto h-screen overflow-hidden">
        <Header />

        <div className="flex-1 flex flex-col py-4">
          <div className="w-full flex flex-end items-end gap-2">
            <div className={`mr-auto text-2xl font-medium ${inter.className}`}>
              Popular products <TotalNum />
            </div>
            <Listing />
          </div>

          <div className="w-full flex-1 mt-8">
            <Market />
          </div>
        </div>
      </div>
    </div>
  );
}
