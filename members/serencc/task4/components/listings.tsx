"use client"

import { useReadContract } from "wagmi"

import { NFTMarketAddress } from "@/lib/constants"
import { NFTMarketABI } from "@/lib/abis"
import { CardItem } from "@/components/card-item"

export const Listings = () => {
  const { data } = useReadContract({
    abi: NFTMarketABI,
    address: NFTMarketAddress,
    functionName: "getAllListedNFTs",
    query: {
      refetchInterval: 1000,
    },
  })
  const listings = data?.filter((listing) => listing.isListed) || []

  return (
    <div className="mx-24 my-8 grid grid-cols-4 gap-8">
      {listings &&
        listings.map((listing) => (
          <CardItem
            key={listing.tokenId}
            seller={listing.seller}
            tokenid={listing.tokenId}
            price={listing.price}
            nftContract={listing.nftContract}
            nftURI={listing.nftURI}
            listedAt={listing.listedTime}
          />
        ))}
    </div>
  )
}
