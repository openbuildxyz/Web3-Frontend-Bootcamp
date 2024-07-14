import React, { useMemo, useState } from "react";
import NFTMarket from "./contracts/NFTMarket.json";
import MyToken from "./contracts/MyToken.json";
import MyNFT from "./contracts/MyNFT.json";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { hashUrl, MyTokenAddress, NFTMarketAddress } from "./config";

function BuyNFT() {
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { data: hash, writeContractAsync, isPending } = useWriteContract();

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();
  const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } =
    useWaitForTransactionReceipt({
      hash: hash as any,
    });

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

  const buyHashUrl = hashUrl + hash;

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
      <h3>可售卖 NFT 列表:</h3>
      <ul>
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

export default BuyNFT;
