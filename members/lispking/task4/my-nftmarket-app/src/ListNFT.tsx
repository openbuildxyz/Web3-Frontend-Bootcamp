import { useState } from "react";
import { useWriteContract } from "wagmi";
import NFTMarket from "./contracts/NFTMarket.json";
import { parseAbi } from "viem";
import React from "react";
import { hashUrl, MyNFTAddress, NFTMarketAddress } from "./config";

const ERC721_ABI = parseAbi([
  "function approve(address to, uint256 tokenId) external",
]);

function ListNFT() {
  const [nftAddress, setNftAddress] = useState<`0x${string}`>(MyNFTAddress);
  const [tokenId, setTokenId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { data: hash, writeContractAsync, isPending } = useWriteContract();
  const {
    data: hashList,
    writeContractAsync: writeContractAsyncList,
    isPending: isPendingList,
  } = useWriteContract();

  const approve = async () => {
    return await writeContractAsync({
      address: nftAddress,
      functionName: "approve",
      args: [NFTMarketAddress, tokenId as any],
      abi: ERC721_ABI,
    });
  };

  const listItem = async () => {
    return await writeContractAsyncList({
      address: NFTMarketAddress,
      abi: NFTMarket.abi,
      functionName: "listItem",
      args: [nftAddress, tokenId, price] as any,
    });
  };

  async function listNFT() {
    await approve();
    await listItem();
  }

  const listHashUrl = hashUrl + hashList;

  return (
    <div>
      <h3>上架 NFT</h3>
      NFT 合约地址：
      <input
        type="text"
        placeholder={MyNFTAddress}
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value as any)}
      />
      TokenId:{" "}
      <input
        type="text"
        placeholder="0"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      售卖价格：
      <input
        type="text"
        placeholder="Price (in ERC20 tokens)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="button" disabled={isPending} onClick={listNFT}>
        {isPending || isPendingList ? "Listing...." : "List NFT"}
      </button>
      {hashList && (
        <div>
          上架 NFT 成功！ 请点击 <a href={listHashUrl}>{hashList}</a> 查看
        </div>
      )}
    </div>
  );
}

export default ListNFT;
