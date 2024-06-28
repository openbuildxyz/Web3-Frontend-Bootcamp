// components/ShowListedNFTs.tsx
"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useReadContract } from 'wagmi';
import { NFTMarket as marketABI } from '@/lib/abi';

interface Listing {
  seller: string;
  tokenId: bigint;
  price: bigint;
}

interface ShowListedNFTsProps {
  marketContractAddress: `0x${string}`;
}

export default function ShowListedNFTs({ marketContractAddress }: ShowListedNFTsProps) {
  const [listings, setListings] = useState<Listing[]>([]);

  const { 
    data: listingsData,
    error,
    isPending,
    refetch
  } = useReadContract({
    address: marketContractAddress,
    abi: marketABI,
    functionName: 'getListedNFTs',
  });

  useEffect(() => {
    if (listingsData) {
      setListings(listingsData as Listing[]);
    }
  }, [listingsData]);

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl mb-4">Listed NFTs</h2>
      {isPending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.shortMessage || error.message}</div>
      ) : (
        <ul>
          {listings.map((listing, index) => (
            <li key={index} className="mb-2">
              Token ID: {Number(listing.tokenId)}, Price: {ethers.formatUnits(listing.price, 'ether')} MTK, Seller: {listing.seller}
            </li>
          ))}
        </ul>
      )}
      <button onClick={()=>{ refetch() }} className="btn mt-2">Refresh</button>
    </div>
  );
}
