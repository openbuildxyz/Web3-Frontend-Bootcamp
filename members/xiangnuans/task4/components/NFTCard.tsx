//显示NFT卡片组件
import BuyNFT from "./BuyNFT";
import { NFT } from "./NFTList";
import { ethers } from "ethers";

interface NFTCardProps {
  nft: NFT;
}

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="border p-4 mb-4">
      <p>Contract: {nft.nftAddress}</p>
      <p>Token ID: {nft.tokenId}</p>
      <p>Price: {ethers.utils.formatUnits(nft.price, "ether")} ETH</p>
      <p>Seller: {nft.seller}</p>
      <BuyNFT nft={nft} />
    </div>
  );
}
