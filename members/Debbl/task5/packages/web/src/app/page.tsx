"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import CreateNFT from "./components/CreateNFT";
import ListItem from "./components/ListItem";
import NFTCard from "./components/NFTCard";
import TransferToken from "./components/TransferToken";
import { Contract } from "~/constants";

export default function Page() {
  const data = useReadContract({
    ...Contract.NFTMarket,
    functionName: "getAll",
    args: [],
  });

  const showData = data.isSuccess
    ? data.data
        .filter((d) => d.isListed)
        .map((d) => ({
          ...d,
          tokenId: d.tokenId.toString(),
          price: formatEther(d.price),
        }))
    : [];

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <ConnectButton />
      <div>
        <TransferToken />
        <CreateNFT />
        <ListItem />
        <div className="mt-10 flex gap-6">
          {data.isSuccess &&
            showData.map((d) => <NFTCard key={d.tokenId} {...d} />)}
        </div>
      </div>
    </main>
  );
}
