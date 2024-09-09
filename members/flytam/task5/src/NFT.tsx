import { useMemo, useState } from "react";
import { address } from "./address";
import { tokenAbi, marketAbi } from "./abi";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseAbi } from "viem";

const ERC721_ABI = parseAbi([
  "function approve(address to, uint256 tokenId) external",
]);

export function NFT() {
  const account = useAccount();
  const [selectIndex, setSelectIndex] = useState<number>(-1);

  const config = useConfig();

  const [nftAddress, setNftAddress] = useState<`0x${string}`>("0x");
  const [tokenId, setTokenId] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const {
    data: hashList,
    writeContractAsync: writeContractAsyncList,
    isPending: isPendingList,
  } = useWriteContract();

  const { isLoading: isConfirmingList, isSuccess: isConfirmedList } =
    useWaitForTransactionReceipt({
      hash: hashList as any,
    });

  // const config = useConfig();

  const listNFT = async () => {
    console.log("start approve");
    const res = await writeContract(config, {
      address: nftAddress,
      functionName: "approve",
      args: [address.marketAddress, tokenId as any],
      abi: ERC721_ABI,
    });

    console.log("approve done", res);

    await waitForTransactionReceipt(config, {
      hash: res,
    });

    const res2 = await writeContractAsyncList({
      address: address.marketAddress,
      abi: marketAbi,
      functionName: "listNFT",
      args: [nftAddress, tokenId, price] as any,
    });

    await waitForTransactionReceipt(config, {
      hash: res2,
    });

    console.log("list done", res2);
    result.refetch();
  };

  const {
    data: hashBuy,
    writeContractAsync: writeContractAsyncBuy,
    isPending: isPendingBuy,
  } = useWriteContract();

  const result = useReadContract({
    abi: marketAbi,
    address: address.marketAddress,
    functionName: "getAllListings",
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
    const res = await writeContract(config, {
      address: address.erc20Address,
      abi: tokenAbi,
      functionName: "approve",
      args: [address.marketAddress, selectedItem.price * 10n ** 18n],
    });
    console.log("approve done");

    await waitForTransactionReceipt(config, {
      hash: res,
    });

    const res2 = await writeContractAsyncBuy({
      address: address.marketAddress,
      abi: marketAbi,
      functionName: "purchaseNFT",
      args: [selectIndex as any],
    });

    await waitForTransactionReceipt(config, {
      hash: res2,
    });
    console.log("buy done");
    result.refetch();
  };

  const delistNFT = async (index: number) => {
    const res = await writeContract(config, {
      address: address.marketAddress,
      abi: marketAbi,
      functionName: "delistNFT",
      args: [index as any],
    });

    await waitForTransactionReceipt(config, {
      hash: res,
    });

    result.refetch();
  };

  return (
    <div>
      <div>
        <h3>List NFT</h3>
        <input
          type="text"
          placeholder="NFT Contract Address"
          value={nftAddress}
          onChange={(e) => setNftAddress(e.target.value as any)}
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price (in ERC20 tokens)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button disabled={isPendingList} onClick={listNFT}>
          {isPendingList ? "Listing...." : "List NFT"}
        </button>

        {hashList && <div>List ransaction Hash: {hashList}</div>}
        {isConfirmingList && <div>List Waiting for confirmation...</div>}
        {isConfirmedList && <div>List Transaction confirmed.</div>}
      </div>
      <h3>Buy NFT</h3>
      <button disabled={isPendingBuy || selectIndex < 0} onClick={buyNFT}>
        {isPendingBuy ? "Buying...." : "Buy NFT"}
      </button>
      <h3>Listed NFTs:</h3>
      <ul>
        {listings?.map((listing, index) =>
          listing.sold ? null : (
            <li
              key={index}
              style={{
                backgroundColor: index === selectIndex ? "yellow" : "lightgrey",
                cursor: "pointer",
              }}
              onClick={() => setSelectIndex(index === selectIndex ? -1 : index)}
            >
              <p>
                <img
                  src={listing.tokenURI}
                  style={{ width: "100px", height: "100px" }}
                />
              </p>
              <p>NFT Contract: {listing.nftContract}</p>
              <p>Token ID: {String(listing.tokenId)}</p>
              <p>Seller: {listing.seller}</p>
              <p>
                List time:{" "}
                {new Date(Number(listing.timestamp) * 1000).toLocaleString()}
              </p>
              <p>Price: {listing.price.toString()}</p>
              {listing.seller === account.addresses?.[0] ? (
                <p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      delistNFT(index);
                    }}
                  >
                    delist
                  </button>
                </p>
              ) : null}
            </li>
          )
        )}
      </ul>
      {hashBuy && <div>Buy Transaction Hash: {hashBuy}</div>}
    </div>
  );
}
