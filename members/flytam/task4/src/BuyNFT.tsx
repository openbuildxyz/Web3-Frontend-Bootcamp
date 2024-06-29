import React, { useMemo, useState } from "react";
import { address } from "./address";
import { tokenAbi, marketAbi } from "./abi";
import {
  useConfig,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'

export function BuyNFT() {
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();
  const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } =
    useWaitForTransactionReceipt({
      hash: hashBuy as any,
    });

  const config = useConfig();

  const result = useReadContract({
    abi: marketAbi,
    address: address.marketAddress,
    functionName: "getAllListings",
    query: {
      refetchInterval: 3000,
    },
  });

  // useWatchContractEvent({
  //   address: address.marketAddress,
  //   abi: marketAbi,
  //   eventName: 'NFTListed',
  //   onLogs(logs) {
  //     location.reload();
  //   },
  // })

  // useWatchContractEvent({
  //   address: address.marketAddress,
  //   abi: marketAbi,
  //   eventName: 'NFTPurchased',
  //   onLogs(logs) {
  //     location.reload();
  //   },
  // })

  const listings = useMemo(() => {
    return (
      result.data?.map((x) => ({
        ...x,
      })) ?? []
    );
  }, [result.data]);

  const buyNFT = async () => {
    const selectedItem = listings[selectIndex];
    const res = await writeContract(config, {
      address: address.erc20Address,
      abi: tokenAbi,
      functionName: "approve",
      args: [address.marketAddress, selectedItem.price * 10n ** 18n],
    })
    await waitForTransactionReceipt(config, {
      hash: res
    })
    console.log("approve done");

    await writeContractAsyncBuy({
      address: address.marketAddress,
      abi: marketAbi,
      functionName: "purchaseNFT",
      args: [selectIndex as any],
    });
    console.log("buy done");
  };

  return (
    <div>
      <h3>Buy NFT</h3>
      <button disabled={isPendingBuy || selectIndex <0 } onClick={buyNFT}>
        {isPendingBuy ? "Buying...." : "Buy NFT"}
      </button>
      <h3>Listed NFTs:</h3>
      <ul>
        {listings?.map((listing, index) =>
          listing.nftContract ===
          "0x0000000000000000000000000000000000000000" ? null : (
            <li
              key={index}
              style={{
                backgroundColor: index === selectIndex ? "yellow" : "lightgrey",
                cursor: "pointer",
              }}
              onClick={() => setSelectIndex(index)}
            >
              <p>NFT Contract: {listing.nftContract}</p>
              <p>Token ID: {String(listing.tokenId)}</p>
              <p>Seller: {listing.seller}</p>
              <p>Price: {listing.price.toString()}</p>
            </li>
          )
        )}
      </ul>
      {hashBuy && <div>Buy Transaction Hash: {hashBuy}</div>}
      {isConfirmingBuy && <div>Buy Waiting for confirmation...</div>}
      {isConfirmedBuy && <div>Buy Transaction confirmed.</div>}
    </div>
  );
}
