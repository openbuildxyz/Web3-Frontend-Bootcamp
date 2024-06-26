'use client';
import { useState } from 'react';
import { useEthersSigner } from '@/utils/useEthersSigner';
import { ethers } from 'ethers';
import NFTMarketABI from '../../abis/NFTMarketABI.json';
import { Input, Button } from '@nextui-org/react';

const BuyNFT: React.FC = () => {
  const signer = useEthersSigner();
  const [listingId, setListingId] = useState('');

  const buyNFT = async () => {
    if (!signer) return;
    const contract = new ethers.Contract('NFTMarket_CONTRACT_ADDRESS', NFTMarketABI, signer);
    await contract.buyNFT(listingId);
  };

  return (
    <div>
      <Input
        isClearable
        variant="underlined"
        placeholder="Listing ID"
        value={listingId}
        onChange={(e) => setListingId(e.target.value)}
      />
      <Button onClick={buyNFT}>Buy NFT</Button>
    </div>
  );
};

export default BuyNFT;
