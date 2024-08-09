"use client";
import { Header, Listing, Market } from "@/components";
import MyNFT from "@/components/MyNFT";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { inter } from "@/context/font";
import clsx from "clsx";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  console.log("isConnected: ", isConnected);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-[1440px] mx-auto h-screen overflow-hidden flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col py-4 h-full">
          <div className="w-full flex flex-end items-end gap-2">
            <div className={`mr-auto text-2xl font-medium ${inter.className}`}>
              Popular products
            </div>
            <Listing />
          </div>

          <div className="w-full flex-1 mt-8">
            <Tabs defaultValue="market" className="h-full flex flex-col">
              <TabsList
                className={clsx(
                  "grid w-[400px]",
                  isConnected ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                <TabsTrigger value="market">Market</TabsTrigger>

                {isConnected && <TabsTrigger value="myNFT">My NFT</TabsTrigger>}
              </TabsList>

              <TabsContent value="market" className="w-full flex-1">
                <Market />
              </TabsContent>

              {isConnected && (
                <TabsContent value="myNFT" className="w-full flex-1">
                  <MyNFT />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
