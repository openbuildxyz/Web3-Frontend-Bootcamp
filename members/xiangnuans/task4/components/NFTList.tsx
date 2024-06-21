// 显示上架的NFT组件
import { useEffect, useState } from "react";

import NFTCard from "./NFTCard";
import { ethers } from "ethers";
import nftMarketAbi from "../utils/nftMarketAbi.json";

const NFTMarketAddress = "0xYourNFTMarketContractAddress";

interface NFT {
  nftAddress: string;
  tokenId: string;
  price: ethers.BigNumber;
  seller: string;
}

export default function NFTList() {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const nftMarketContract = new ethers.Contract(
        NFTMarketAddress,
        nftMarketAbi,
        provider
      );
      const nftList = await nftMarketContract.getListedNFTs();
      setNfts(nftList);
    };
    fetchNFTs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Listed NFTs</h2>
      {nfts.map((nft, index) => (
        <NFTCard key={index} nft={nft} />
      ))}
    </div>
  );
}
