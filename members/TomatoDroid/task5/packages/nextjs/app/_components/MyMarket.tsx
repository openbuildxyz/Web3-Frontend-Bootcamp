"use client";

import { useState } from "react";
import { NFTCard } from "./NFTCard";
import { formatUnits } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  id: number;
  uri: string;
  owner: string;
}

export interface NFTListingInfo {
  tokenId: string;
  seller: string;
  nftContract?: string;
  price: string;
  isActive: boolean;
  isListing: boolean;
  time: string;
}

export const MyMarket = () => {
  const [listingNFTsLoading] = useState(false);

  const { data: allListings } = useScaffoldReadContract({
    contractName: "NFTExchange",
    functionName: "getAllListings",
    watch: true,
  });

  const allListingsUpdate = allListings
    ?.map(item => {
      return {
        tokenId: parseInt(item.tokenId.toString()).toString(),
        price: formatUnits(item.price, 9),
        time: parseInt(item.time.toString()).toString(),
        seller: item.seller,
        isActive: item.isActive,
        isListing: item.isListing,
      };
    })
    .filter(item => item.isActive)
    .filter(item => item.isListing);

  if (listingNFTsLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div className="my-4">
        <div className="text-2xl px-5">NFT Market</div>
        {allListingsUpdate?.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <div className="text-2xl text-primary-content">No NFTs Listing</div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 my-4 px-5">
            {allListingsUpdate?.map(item => (
              <NFTCard key={item.tokenId} listingInfo={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
