// app/page.tsx
"use client";

import ConnectWallet from '../components/ConnectWallet';
import ListNFT from '../components/ListNFT';
import ShowListedNFTs from '../components/ShowListedNFTs';
import BuyNFT from '../components/BuyNFT';
import { useState } from 'react';

const tokenContractAddress = '0x005d3A77B67e951540810e29ac3ba46bE9e61282';
const nftContractAddress = '0x691d32c0f26aFf9188aAF258Cf8036eA9eD2Bccf';
const marketContractAddress = '0xEa9031966A0B41C8DDC94Ba2Ace4D22E91DFab95';

export default function Home() {
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NFT Marketplace</h1>
      <ConnectWallet />
      <div className="mt-6">
        <ShowListedNFTs marketContractAddress={marketContractAddress} />
      </div>
      <div className="mt-6">
        <ListNFT key={key1} reset={()=>{setKey1(key1 + 1)}} marketContractAddress={marketContractAddress} nftContractAddress={nftContractAddress} />
      </div>
      <div className="mt-6">
        <BuyNFT key={key2} reset={()=>{setKey2(key2 + 1)}} marketContractAddress={marketContractAddress} tokenContractAddress={tokenContractAddress} />
      </div>
    </div>
  );
}
