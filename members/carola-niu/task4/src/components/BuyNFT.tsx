import React, { useMemo, useState } from "react";
import NFTMarketABI from "../contracts/NFTMarketABI.json";
import FederCoinABI from "../contracts/FederCoinABI.json";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { hashUrl, MyNFTAddress, MyTokenAddress, NFTMarketAddress } from "../config";
import dayjs from "dayjs";


function BuyNFT() {
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const { data: hash, writeContractAsync, isPending } = useWriteContract();
  const { data: hashBuy, writeContractAsync: writeContractAsyncBuy, isPending: isPendingBuy } = useWriteContract();
  const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } = useWaitForTransactionReceipt({ hash: hash as any });

  const result = useReadContract({
    abi: NFTMarketABI,
    address: NFTMarketAddress,
    functionName: "getAllListings",
    query: { refetchInterval: 3000 },
  });

  const listings = useMemo(() => {
    return (result.data as any[])?.map((x) => ({ ...x })) ?? [];
  }, [result.data]);

  const buyNFT = async () => {
    const selectedItem = listings[selectIndex];
    await writeContractAsync({
      address: MyTokenAddress,
      abi: FederCoinABI,
      functionName: "approve",
      args: [NFTMarketAddress, selectedItem.price],
    });

    await writeContractAsyncBuy({
      address: NFTMarketAddress,
      abi: NFTMarketABI,
      functionName: "buyingNFT",
      args: [MyNFTAddress,selectedItem.tokenId as any],
    });
  };

  const unlistNFT = async () => {
    const selectedItem = listings[selectIndex];
    await writeContractAsyncBuy({
      address: NFTMarketAddress,
      abi: NFTMarketABI,
      functionName: "unlistNFT",
      args: [MyNFTAddress,selectedItem.tokenId as any],
    });
  };

  const buyHashUrl = hashUrl + hash;

  return (
    <div className="container" style={{ border: "1px solid #ccc", padding: "5px", margin: "5px", width: "45%", height: "500px" }}>
      <button className="btn" disabled={isPending || selectIndex < 0} onClick={buyNFT}>
        {isPending ? "Buying" : "Buy NFT"}
      </button>
      {hashBuy && (
        <div>
          Purchase Successfully！ Please Click <a href={hashUrl + hashBuy}>{hashBuy}</a> to check the transaction.
        </div>
      )}
      <h3>Available NFT List:</h3>
      <ul>
        {listings.map((listing, index) => {
          const isSelected = selectIndex === index;
          return (
            <li
              key={index}
              style={{
                cursor: "pointer",
                backgroundColor: isSelected ? "#ccc" : "#fff",
              }}
              onClick={() => setSelectIndex(isSelected ? -1 : index)}
            >
              <p>NFT Contract Address: {listing.nftAddress}</p>
              <p>NFT Token ID: {String(listing.tokenId)}</p>
              <p>NFT Seller Address: {listing.seller}</p>
              <p>Price: {listing.price.toString()}</p>
              <img src={listing.tokenUrl} alt="NFT Preview" style={{ maxWidth: "100px" }} />
              <p>Listed Time: {dayjs(Number(listing.listedAt) * 1000).format('YYYY-MM-DD HH:mm:ss')}</p>
              <button className="btn" onClick={() => unlistNFT()}>
                Unlist
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BuyNFT;