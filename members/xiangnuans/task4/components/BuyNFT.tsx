"use client";

import { MyTokenAddress, NFTMarketAddress, hashUrl } from "@/config";
import { useMemo, useState } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import MyTokenContract from "@/abi/MyToken.json";
import NFTMarkContract from "@/abi/NFTMarket.json";

export default function BuyNFT() {
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();

  // const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } =
  //   useWaitForTransactionReceipt({
  //     hash: hash as any,
  //   });

  const result: any = useReadContract({
    abi: NFTMarkContract.abi,
    address: NFTMarketAddress,
    functionName: "getAllListings",
    query: {
      refetchInterval: 3000,
    },
  });

  // console.log("result: " + JSON.stringify(result || {}));
  const listings = useMemo(() => {
    return (
      result?.data?.map((x: any) => ({
        ...x,
      })) ?? []
    );
  }, [result.data]);

  const buyNFT = async () => {
    const selectedItem = listings[selectIndex];
    await writeContractAsync({
      address: MyTokenAddress,
      abi: MyTokenContract.abi,
      functionName: "approve",
      args: [NFTMarketAddress, selectedItem.price],
    });

    await writeContractAsyncBuy({
      address: NFTMarketAddress,
      abi: NFTMarkContract.abi,
      functionName: "buyNFT",
      args: [selectIndex as any],
    });
  };
  const buyHashUrl = hashUrl + hash;

  return (
    <div className="p-4 w-1/2">
      <h2 className="text-2xl font-bold mb-4">购买 NFT</h2>
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={isPending || isPendingBuy || selectIndex < 0}
          onClick={buyNFT}
        >
          {isPending ? "Buying...." : "Buy NFT"}
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">可售卖 NFT 列表:</h2>
      <ul>
        {listings?.map((listing: any, index: number) => (
          <li
            key={index}
            style={{
              backgroundColor:
                index === selectIndex ? "lightblue" : "lightgrey",
              cursor: "pointer",
            }}
            onClick={() => setSelectIndex(index)}
          >
            <p>NFT 合约地址: {listing.nftAddress}</p>
            <p>TokenId: {String(listing.tokenId)}</p>
            <p>卖家地址: {listing.seller}</p>
            <p>NFT 售价: {listing.price.toString()}</p>
          </li>
        ))}
      </ul>
      {hashBuy && (
        <div>
          购买 NFT 成功！ 请点击 <a href={buyHashUrl}>{hash}</a> 查看
        </div>
      )}
    </div>
  );
}
