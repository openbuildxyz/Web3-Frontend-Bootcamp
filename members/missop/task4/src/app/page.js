"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Contract from "./components/Contract";
import ListNFTs from "./components/ListNFTs";

export default function Home() {
  const account = useAccount();

  return (
    <div className="p-2 flex flex-col gap-4">
      <ConnectButton />
      {account.address && <Contract />}
      <ListNFTs />
    </div>
  );
}
