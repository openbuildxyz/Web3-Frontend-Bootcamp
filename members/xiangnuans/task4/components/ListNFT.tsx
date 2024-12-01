"use client";

// 上架NFT
import { MyNFTAddress, NFTMarketAddress, hashUrl } from "@/config";

// import MyNFTContract from "@/abi/MyNFT.json";
import NFTMarketConstract from "@/abi/NFTMarket.json";
import { parseAbi } from "viem";
import { useState } from "react";
import { useWriteContract } from "wagmi";

const ERC721_ABI = parseAbi([
  "function approve(address to, uint256 tokenId) external",
]);

export default function ListNFT() {
  const [nftAddress, setNftAddress] = useState<`0x${string}`>(MyNFTAddress);
  const [tokenId, setTokenId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { writeContractAsync, isPending } = useWriteContract();
  const {
    data: hashList,
    writeContractAsync: writeContractAsyncList,
    isPending: isPendingList,
  } = useWriteContract();

  const approve = async () => {
    try {
      return await writeContractAsync({
        address: nftAddress,
        functionName: "approve",
        args: [NFTMarketAddress, tokenId as any],
        abi: ERC721_ABI,
      });
    } catch (error) {
      console.log("Error during approve：", error);
      throw error;
    }
  };

  const listItem = async () => {
    return await writeContractAsyncList({
      address: NFTMarketAddress,
      abi: NFTMarketConstract.abi,
      functionName: "listNFT",
      args: [nftAddress, tokenId, price] as any,
    });
  };

  async function listNFT() {
    await approve();
    await listItem();
  }

  const listHashUrl = hashUrl + hashList;

  return (
    <div className="p-4 w-1/2">
      <h2 className="text-2xl font-bold mb-4">上架 NFT</h2>
      <div className="flex flex-row w-full">
        <div className=" w-40">NFT合约地址：</div>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          placeholder="NFT Contract Address"
          value={nftAddress}
          onChange={(e) => setNftAddress(e.target.value as any)}
        />
      </div>
      <div className="flex flex-row w-full">
        <div className=" w-40">Token ID：</div>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <div className="flex flex-row w-full">
        <div className=" w-40">售卖价格：</div>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Price (in ERC20 tokens)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className=" flex justify-center">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={isPending}
          onClick={listNFT}
        >
          {isPending || isPendingList ? "Listing...." : "List NFT"}
        </button>
      </div>
      {hashList && (
        <div>
          上架 NFT 成功！ 请点击 <a href={listHashUrl}>{hashList}</a> 查看
        </div>
      )}
    </div>
  );
}
