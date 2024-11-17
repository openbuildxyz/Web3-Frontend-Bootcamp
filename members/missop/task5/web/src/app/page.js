"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Operations from "./components/Operations";
import ListNFTs from "./components/ListNFTs";

export default function Home() {
  const account = useAccount();

  return (
    <div className="py-4 w-3/4 mx-auto flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-3xl font-bold">Missop NFT 市场</span>
        <ConnectButton />
      </div>
      <div className="flex gap-4">
        <ListNFTs />
        {account.address && <Operations />}
      </div>
    </div>
  );
}
