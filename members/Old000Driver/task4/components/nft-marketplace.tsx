"use client";

import { useState, useEffect, useCallback } from "react";
import { NFTCard } from "./nft-card";
import { ListNFT } from "./list-nft";
import { fetchAllListings, type ListingNFT } from "@/utils/fetchListings";

export default function NFTMarketplace() {
  const [nftList, setNftList] = useState<ListingNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNFTs = useCallback(async () => {
    try {
      setIsLoading(true);
      const listings = await fetchAllListings();
      setNftList(listings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取NFT列表失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshNFTs();
  }, [refreshNFTs]);

  const handleBuyNFT = useCallback(
    async (tokenId: string) => {
      console.log(`Buying NFT with tokenId: ${tokenId}`);
      await refreshNFTs(); // 购买后刷新列表
    },
    [refreshNFTs]
  );

  const handleDelist = useCallback(async (tokenId: string) => {
    console.log("Starting refresh after delist for tokenId:", tokenId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒确保交易完全确认
      await refreshNFTs();
      console.log("Refresh completed after delist");
    } catch (error) {
      console.error("Error refreshing after delist:", error);
      toast.error("Failed to refresh NFT list");
    }
  }, [refreshNFTs]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <ListNFT onSuccess={refreshNFTs} />
      </div>
      {isLoading && <p className="text-center">加载中...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nftList.map((nft: ListingNFT) => (
          <NFTCard
            key={nft.tokenId}
            nft={nft}
            onBuyNFT={handleBuyNFT}
            onDelist={handleDelist}
          />
        ))}
      </div>
      {nftList.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No NFTs found. Try a different search or list a new NFT.
        </p>
      )}
    </main>
  );
}
