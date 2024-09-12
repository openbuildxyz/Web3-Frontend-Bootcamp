"use client";

import { useReadContract, useAccount } from "wagmi";
import TokenAbi from "@/abi/Token";
import NFTMarketAbi from "@/abi/NFTMarket";
import { TOKEN_ADDRESS, NFT_MARKET_ADDRESS } from "@/config/constant-config";

import type { ListNFTCardProps } from "@/types/list";
import { ListNFTCard } from "@/components/list-nft-cart";
import { formatBalance } from "@/lib/utils";

export default function Home() {
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    abi: TokenAbi,
    address: TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: mineNFTs } = useReadContract({
    abi: NFTMarketAbi,
    address: NFT_MARKET_ADDRESS,
    functionName: "getListedNFTs",
  });

  const nfts = (mineNFTs || []) as ListNFTCardProps[];
  const userBalance = formatBalance(Number(balance) || 0);

  return (
    <main className="flex-1">
      <div className="px-8 py-4">Your Balance: {`${userBalance} SC`}</div>
      <div className="flex gap-4 flex-wrap px-8 py-4">
        {nfts.map((nft) => (
          <ListNFTCard key={nft.tokenId} {...nft} />
        ))}
      </div>
    </main>
  );
}
