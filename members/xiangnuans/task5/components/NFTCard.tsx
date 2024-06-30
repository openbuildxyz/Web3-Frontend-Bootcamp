import { MarketAddress, MyTokenAddress, hashUrl } from "@/scripts/config";

import { Button } from "@nextui-org/react";
import MarkContract from "@/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import React from "react";
import TokenContract from "@/artifacts/contracts/myToken.sol/MyToken.json";
import { parseUnits } from "ethers";
import { useWriteContract } from "wagmi";

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
  const {
    data: hash,
    writeContractAsync: approveContractAsync,
    isPending,
  } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: buyContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();
  const {
    data: delHash,
    writeContractAsync: DelContractAsync,
    isPending: isDelPending,
  } = useWriteContract();

  const buyHashUrl = hashUrl + hash;

  const buyNFT = async () => {
    try {
      const price = parseUnits(listing.price.toString(), "ether");
      console.log("price = ", price);
      const approvRes = await approveContractAsync({
        address: MyTokenAddress,
        abi: TokenContract.abi,
        functionName: "approve",
        args: [MarketAddress, price],
      });
      console.log("approve success ", approvRes);
    } catch (error) {
      console.log("approve ERROR: " + error);
      throw error;
    }

    try {
      await buyContractAsyncBuy({
        address: MarketAddress,
        abi: MarkContract.abi,
        functionName: "buyNFT",
        args: [listing.nftContract, listing.tokenId],
      });
    } catch (err) {
      console.error("buyNFT error", err);
    }
  };

  // 下架
  const delistNFT = async () => {
    await DelContractAsync({
      address: MarketAddress,
      abi: MarkContract.abi,
      functionName: "delistNFT",
      args: [listing.nftContract, listing.tokenId],
    });
    // TODO 因为列表定时获取数据，所以这里不做刷新处理
  };

  // const approve = async () => {
  //   try {
  //     return await writeContractAsync({
  //       address: nftAddress,
  //       functionName: "approve",
  //       args: [MarketAddress, tokenId as any],
  //       abi: ERC721_ABI,
  //     });
  //   } catch (error) {
  //     console.log("Error during approve：", error);
  //     throw error;
  //   }
  // };

  // console.log("hash=", hash);
  // console.log("listNFTAddress=", listNFTHash);

  // const listItem = async () => {
  //   try {
  //     return await writeContractAsyncList({
  //       address: MarketAddress,
  //       abi: NFTMarketConstract.abi,
  //       functionName: "listNFT",
  //       args: [nftAddress, tokenId, price] as any,
  //     });
  //   } catch (error) {
  //     console.log("error during listNFT", error);
  //     throw error;
  //   }
  // };

  // /**
  //  * 铸造NFT
  //  */
  // const mintNFT = async () => {
  //   try {
  //     return await writeContractAsync({
  //       address: nftAddress,
  //       functionName: "mint",
  //       args: [address as `0x${string}`, tokenURI], //
  //       abi: NFTContract.abi,
  //     });
  //   } catch (error) {
  //     console.log("Error during mint: ", error);
  //     throw error;
  //   }
  // };

  // async function listNFT() {
  //   await mintNFT();
  //   await approve();
  //   await listItem();
  // }

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
                onClick={delistNFT}
              >
                {isDelPending ? "delisting...." : "delist NFT"}
              </Button>
              <Button
                key="2"
                className="bg-[#0E76FD] text-white py-2 px-4 rounded h-8 mr-4"
                disabled={isPending || isPendingBuy}
                onClick={buyNFT}
              >
                {isPending || isPendingBuy ? "buying...." : "buy NFT"}
              </Button>
            </>
          )}
        </div>
      </div>
      {/* {hashBuy && (
        <div>
          购买 NFT 成功！ 请点击 <a href={buyHashUrl}>{hash}</a> 查看
        </div>
      )} */}
    </div>
  );
};

export default NFTCard;
