import { MarketAddress, MyTokenAddress, hashUrl } from "@/scripts/config";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { Button } from "@nextui-org/react";
import ERC20_ABI from "@/artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import MyToken from "@/artifacts/contracts/myToken.sol/MyToken.json";
import NFTMarket from "@/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import React from "react";
import { parseUnits } from "ethers";

interface Props {
  listing: {
    url: string;
    nftContract: string;
    tokenId: string;
    seller: string;
    price: string;
    tokenURI: string;
    listingTime: number;
    delistingTime: number;
  };
  index: number;
  type: "delisted" | "onSell";
}

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000); // 将秒数转换为毫秒数
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1并补零
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

const NFTCard = ({ listing, index, type }: Props) => {
  const { address } = useAccount();
  const {
    data: hash,
    writeContractAsync: approveContractAsync,
    isPending,
  } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: buyContractAsync,
    isPending: isPendingBuy,
  } = useWriteContract();
  const {
    data: delHash,
    writeContractAsync: DelContractAsync,
    isPending: isDelPending,
  } = useWriteContract();

  const buyHashUrl = hashUrl + hash;

  const approveTokens = async (price: any) => {
    try {
      console.log("price = ", price);
      return await approveContractAsync({
        address: MyTokenAddress,
        functionName: "approve",
        args: [MarketAddress, price],
        abi: MyToken.abi,
      });
    } catch (error) {
      console.log("approve ERROR: " + error);
      throw error;
    }
  };

  console.log("approve success = ", hash);

  const buyNFT = async () => {
    try {
      console.log("🍎buyNFT =", listing);
      const price = parseUnits(listing.price.toString(), "ether");
      await approveTokens(price);
      return await buyContractAsync({
        address: MarketAddress,
        abi: NFTMarket.abi,
        functionName: "buyNFT",
        args: [listing.nftContract, listing.tokenId],
      });
    } catch (err) {
      console.error("buyNFT error", err);
      throw err;
    }
  };

  // 下架
  const delistNFT = async () => {
    await DelContractAsync({
      address: MarketAddress,
      abi: NFTMarket.abi,
      functionName: "delistNFT",
      args: [listing.nftContract, listing.tokenId],
    });
    // TODO 因为列表定时获取数据，所以这里不做刷新处理
  };

  return (
    <div className="w-full shadow-lg" key={index}>
      <div className="bg-gray-100 cursor-pointer dark:bg-gray-900 shadow-lg overflow-hidden flex flex-col items-center p-6 rounded-lg">
        <img
          className=" w-[626] h-[626]"
          src={listing?.tokenURI}
          alt={`${listing?.tokenURI} alt`}
        />
        <div className="mt-4 max-w-full">
          <p>
            <span className="text-sm font-bold">TokenId：</span>
            <span>{listing?.tokenId?.toString() || "-"}</span>
          </p>
          <p>
            <span className="text-sm font-bold">Price：</span>
            <span>{listing?.price?.toString() || "0"}</span>
          </p>
          <p>
            <span className="text-sm font-bold">ListTime：</span>
            <span>
              {listing?.listingTime
                ? formatTimestamp(Number(listing?.listingTime?.toString()))
                : "--"}
            </span>
          </p>
          {type === "delisted" && (
            <p>
              <span className="text-sm font-bold">DelTime：</span>
              <span>
                {listing?.delistingTime
                  ? formatTimestamp(Number(listing?.delistingTime?.toString()))
                  : "--"}
              </span>
            </p>
          )}
          <p>
            <span className="text-sm font-bold">NFT Contracts：</span>
            <span className="text-xs break-words">{listing?.nftContract}</span>
          </p>
          <p>
            <span className="text-sm font-bold">Seller Address：</span>
            <span className="text-xs break-words">{listing?.seller}</span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          {type === "onSell" && (
            <>
              <Button
                key="1"
                className="bg-[#fd0e0e] text-white py-2 px-4 rounded h-8 mr-4 "
                disabled={isDelPending}
                isLoading={isDelPending}
                onClick={delistNFT}
              >
                {isDelPending ? "delisting...." : "delist NFT"}
              </Button>
              <Button
                key="2"
                className="bg-[#0E76FD] text-white py-2 px-4 rounded h-8 mr-4"
                disabled={isPending || isPendingBuy}
                isLoading={isPending || isPendingBuy}
                onClick={buyNFT}
              >
                {isPending || isPendingBuy ? "buying...." : "buy NFT"}
              </Button>
            </>
          )}
        </div>
      </div>
      {hashBuy && (
        <div>
          购买 NFT 成功！ 请点击 <a href={buyHashUrl}>{hash}</a> 查看
        </div>
      )}
    </div>
  );
};

export default NFTCard;
