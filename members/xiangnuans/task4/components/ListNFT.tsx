// 上架NFT
import { ethers } from "ethers";
import nftMarketAbi from "../utils/nftMarketAbi.json";
import { useSigner } from "wagmi";
import { useState } from "react";

const NFTMarketAddress = "0xYourNFTMarketContractAddress";

export default function ListNFT() {
  const [nftAddress, setNftAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { data: signer } = useSigner();

  const listNFT = async () => {
    if (signer) {
      const nftMarketContract = new ethers.Contract(
        NFTMarketAddress,
        nftMarketAbi,
        signer
      );
      const priceInWei = ethers.utils.parseUnits(price, "ether");
      const tx = await nftMarketContract.listNFT(
        nftAddress,
        tokenId,
        priceInWei
      );
      await tx.wait();
      alert("NFT listed successfully!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">List NFT</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="NFT Contract Address"
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-full"
        type="text"
        placeholder="Price (in ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={listNFT}
      >
        List NFT
      </button>
    </div>
  );
}
