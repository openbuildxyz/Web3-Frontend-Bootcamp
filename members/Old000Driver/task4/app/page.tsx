"use client";

import { useState } from "react";
import { ListNFT } from "../components/list-nft";
import { NFTGrid } from "../components/nft-grid";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NFTMarketplace from "@/components/nft-marketplace";

export default function Home() {
  // const [isConnected, setIsConnected] = useState(false)

  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // 这里可以执行连接成功后的回调
      console.log("Connected with address:", address);
    }
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">NFT Marketplace</h1>
          <ConnectButton />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {isConnected && (
          <>
            {/* <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Listed NFTs</h2>
              <ListNFT />
            </div> */}
            <NFTMarketplace />
          </>
        )}
        {!isConnected && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to NFT Marketplace
            </h2>
            <p className="text-muted-foreground">
              Please connect your wallet to start trading NFTs.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
