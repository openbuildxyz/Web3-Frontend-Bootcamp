import React, { useMemo, useState } from "react";
import NFTMarket from "./contracts/NFTMarket.json";
import MyToken from "./contracts/MyToken.json";
import {
  useReadContract,
  useWriteContract,
} from "wagmi";
import { hashUrl, MyTokenAddress, NFTMarketAddress } from "./config";

function BuyNFT() {
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { writeContractAsync, isPending } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();

  const {
    data: hashOnSale,
    writeContractAsync: writeContractAsyncOnSale,
    isPending: isPendingOnSale,
  } = useWriteContract();

  const {
    data: hashOffSale,
    writeContractAsync: writeContractAsyncOffSale,
    isPending: isPendingOffSale,
  } = useWriteContract();

  const result = useReadContract({
    abi: NFTMarket.abi,
    address: NFTMarketAddress,
    functionName: "getAllListings",
    query: {
      refetchInterval: 3000,
    },
  });

  const listings = useMemo(() => {
    return (
      result.data?.map((x) => ({
        ...x,
      })) ?? []
    );
  }, [result.data]);

  const buyNFT = async () => {
    const selectedItem = listings[selectIndex];
    await writeContractAsync({
      address: MyTokenAddress,
      abi: MyToken.abi,
      functionName: "approve",
      args: [NFTMarketAddress, selectedItem.price],
    });

    await writeContractAsyncBuy({
      address: NFTMarketAddress,
      abi: NFTMarket.abi,
      functionName: "buyItem",
      args: [selectIndex as any],
    });
  };

  const updateNFTOnSale = async () => {
    await writeContractAsyncOnSale({
      address: NFTMarketAddress,
      abi: NFTMarket.abi,
      functionName: "updateItemStatus",
      args: [selectIndex as any, true],
    });
  };

  const updateNFTOffSale = async () => {
    await writeContractAsyncOffSale({
      address: NFTMarketAddress,
      abi: NFTMarket.abi,
      functionName: "updateItemStatus",
      args: [selectIndex as any, false],
    });
  };

  return (
    <div>
      <h3>购买 NFT</h3>
      <button
        className="button"
        disabled={isPending || isPendingBuy || selectIndex < 0}
        onClick={buyNFT}
      >
        {isPending ? "Buying...." : "Buy NFT"}
      </button>
      <button
        className="button"
        disabled={isPendingOnSale || selectIndex < 0}
        onClick={updateNFTOnSale}
      >
        {isPendingOnSale ? "上架中...." : "上架"}
      </button>
      <button
        className="button"
        disabled={isPendingOffSale || selectIndex < 0}
        onClick={updateNFTOffSale}
      >
        {isPendingOffSale ? "下架中...." : "下架"}
      </button>
      <h3>NFT 销售列表:</h3>
      <ul>
        <li>
          <p style={{ width: "30%" }}>NFT 合约地址</p>
          <p style={{ width: "20%" }}>NFT 售价</p>
          <p style={{ width: "10%" }}>TokenId</p>
          <p style={{ width: "30%" }}>卖家地址</p>
          <p style={{ width: "15%" }}>上架时间</p>
          <p style={{ width: "8%" }}>售卖状态</p>
        </li>
        {listings?.map((listing, index) => (
          <li
            key={index}
            style={{
              backgroundColor:
                index === selectIndex ? "lightblue" : "lightgrey",
              cursor: "pointer",
            }}
            onClick={() => setSelectIndex(index)}
          >
            <p style={{ width: "30%" }}>{listing.nftAddress}</p>
            <p style={{ width: "20%" }}>{listing.price.toString()}</p>
            <p style={{ width: "10%" }}>{listing.tokenId.toString()}</p>
            <p style={{ width: "30%" }}>{listing.seller.toString()}</p>
            <p style={{ width: "15%" }}>
              {String(new Date(Number(listing.saleTime) * 1000))}
            </p>
            <p style={{ width: "8%" }}>{listing.onSale ? "可售" : "不可售"}</p>
          </li>
        ))}
      </ul>
      {hashBuy && (
        <div>
          购买成功！ 请点击 <a href={hashUrl + hashBuy}>{hashBuy}</a> 查看
        </div>
      )}
      {hashOnSale && (
        <div>
          上架成功！ 请点击 <a href={hashUrl + hashOnSale}>{hashOnSale}</a> 查看
        </div>
      )}
      {hashOffSale && (
        <div>
          下架成功！ 请点击 <a href={hashUrl + hashOffSale}>{hashOffSale}</a> 查看
        </div>
      )}
    </div>
  );
}

export default BuyNFT;
