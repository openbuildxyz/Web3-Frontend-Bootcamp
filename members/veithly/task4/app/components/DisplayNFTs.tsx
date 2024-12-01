'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFTMarketABI from '@/abis/NFTMarketABI';
import { Card } from '@nextui-org/react';
import BuyNFT from './BuyNFT';
import type { NFT } from '@/types/NFT';

const DisplayNFTs: React.FC = () => {
  const [nfts, setNfts] = useState<any[]>([]);

  const fetchNFTs = async () => {
    const provider = new ethers.AlchemyProvider(process.env.NEXT_PUBLIC_NETWORK, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '', NFTMarketABI, provider);
    const nfts = await contract.getAllListings();
    setNfts(nfts);
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const handlePurchaseComplete = () => {
    fetchNFTs();  // Refresh the NFT list after a successful purchase
  };

  return (
    <div className='grid grid-cols-3 gap-4'>
      {nfts.map((nft: NFT, index) => {
        if (nft.nftContract === '0x0000000000000000000000000000000000000000') return null;
        return (
          <Card className='p-2' key={index} shadow={"none"} isHoverable>
            <p>NFT Contract: {nft.nftContract}</p>
            <p>Token ID: {ethers.formatUnits(nft.tokenId, 0)}</p>
            <p>Price: {ethers.formatUnits(nft.price, 'ether')} MTK</p>
            <p>Seller: {nft.seller}</p>
            <BuyNFT
              listingId={(index+1).toString()}
              nft={nft}
              onPurchaseComplete={handlePurchaseComplete}
            />
          </Card>
        )
      })}
    </div>
  );
};

export default DisplayNFTs;
