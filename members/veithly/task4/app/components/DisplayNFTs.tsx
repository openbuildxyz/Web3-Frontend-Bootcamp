'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFTMarketABI from '@/abis/NFTMarketABI.json';
import { Card } from '@nextui-org/react';

const DisplayNFTs: React.FC = () => {
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      console.log(process.env.NEXT_NEXT_NFTMarket_CONTRACT_ADDRESS || '')
      const provider = new ethers.AlchemyProvider('mainnet', process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_NFTMarket_CONTRACT_ADDRESS || '', NFTMarketABI, provider);
      const nfts = await contract.getListedNFTs();
      setNfts(nfts);
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      {nfts.map((nft, index) => (
        <Card key={index} shadow={"none"} isHoverable>
          <p>NFT Contract: {nft.nftContract}</p>
          <p>Token ID: {nft.tokenId}</p>
          <p>Price: {ethers.formatUnits(nft.price, 'ether')} ETH</p> {/* Update the price formatting */}
          <p>Seller: {nft.seller}</p>
        </Card>
      ))}
    </div>
  );
};

export default DisplayNFTs;
