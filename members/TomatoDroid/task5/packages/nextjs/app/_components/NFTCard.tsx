"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Collectible } from "./MyHolding";
import { NFTListingInfo } from "./MyMarket";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import {
  useDeployedContractInfo,
  useScaffoldContract,
  useScaffoldReadContract,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const NFTCard = ({ nft, listingInfo }: { nft?: Collectible; listingInfo?: NFTListingInfo }) => {
  const { writeContractAsync: writeNFTExchangeContractAsync } = useScaffoldWriteContract("NFTExchange");
  const { writeContractAsync: writeTomatoNFTContractAsync } = useScaffoldWriteContract("TomatoNFT");
  const { writeContractAsync: writeTomatoTokenContractAsync } = useScaffoldWriteContract("TomatoToken");
  const { data: tomatoNFTContract } = useScaffoldContract({
    contractName: "TomatoNFT",
  });
  const { data: nftExchangeContract } = useDeployedContractInfo("NFTExchange");
  const { address: accountAddress } = useAccount();

  const { data: allListings } = useScaffoldReadContract({
    contractName: "NFTExchange",
    functionName: "getAllListings",
  });

  const isListingInfo = useRef<{
    tokenId: bigint;
    price: bigint;
  }>();

  useEffect(() => {
    if (nft === undefined || nft.id === undefined || allListings === undefined) {
      return;
    }
    isListingInfo.current = allListings.find(
      item => BigInt(nft.id) === item.tokenId && item.isListing && item.isActive,
    ) as unknown as {
      tokenId: bigint;
      price: bigint;
    };
    if (isListingInfo.current && isListingInfo.current.tokenId === BigInt(nft.id)) {
      setPrice(formatUnits(isListingInfo.current.price, 9));
    }
  }, [nft, allListings]);

  const [price, setPrice] = useState("1");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const listingImg = useRef<string>();

  useEffect(() => {
    const getListingImg = async () => {
      if (listingInfo === undefined || tomatoNFTContract === undefined) {
        return;
      }

      listingImg.current = await tomatoNFTContract.read.tokenURI([BigInt(listingInfo.tokenId)]);
    };

    getListingImg();
  }, [listingInfo, tomatoNFTContract]);

  async function listing() {
    if (tomatoNFTContract === undefined || !price || nftExchangeContract === undefined) {
      return;
    }
    if (price === "0") {
      notification.warning("NFT's price is not zero");
      return;
    }

    try {
      await writeTomatoNFTContractAsync({
        functionName: "setApprovalForAll",
        args: [nftExchangeContract.address, true],
      });
      await writeNFTExchangeContractAsync({
        functionName: "listNFT",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        args: [tomatoNFTContract?.address, BigInt(nft?.id!), parseUnits(price, 9)],
      });
    } catch (error) {
      notification.error("listNFT firture");
      console.log(error);
    }
  }

  async function buy() {
    try {
      if (
        listingInfo === undefined ||
        listingInfo.tokenId === undefined ||
        tomatoNFTContract === undefined ||
        nftExchangeContract === undefined
      ) {
        return;
      }
      await writeTomatoTokenContractAsync({
        functionName: "approve",
        args: [nftExchangeContract.address, parseUnits(listingInfo.price, 9)],
      });
      await writeNFTExchangeContractAsync({
        functionName: "buyNFT",
        args: [tomatoNFTContract.address, BigInt(listingInfo.tokenId)],
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function takedown() {
    try {
      if (listingInfo === undefined || listingInfo.tokenId === undefined || tomatoNFTContract === undefined) {
        return;
      }
      await writeNFTExchangeContractAsync({
        functionName: "takeDownNFT",
        args: [tomatoNFTContract.address, BigInt(listingInfo.tokenId)],
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card card-compact bg-base-100 shadow-lg w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-60 min-w-full" src={nft ? nft.uri : listingImg.current} alt="NFT Image" />
        <figcaption className="glass absolute bottom-4 left-4 p-4 w-25 rounded-lg">
          <span className="text-white"># {nft?.id || listingInfo?.tokenId}</span>
        </figcaption>
      </figure>
      <div className="card-body space-y-3">
        {nft?.owner && (
          <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Owner</span>
            <Address address={nft?.owner} />
          </div>
        )}
        {listingInfo?.seller && (
          <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Seller</span>
            <Address address={listingInfo?.seller} />
          </div>
        )}
        {listingInfo?.seller && (
          <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Time</span>
            <span>{listingInfo && new Date(parseInt(listingInfo.time) * 1000).toLocaleString()}</span>
          </div>
        )}
        <div className="flex space-x-3 mt-1 items-center">
          <span className="text-lg font-semibold">Price</span>
          {nft ? (
            <input
              className="border p-1 rounded-md border-gray-500"
              min={1}
              value={price}
              onChange={onChange}
              type="number"
              disabled={isListingInfo.current?.tokenId === BigInt(nft.id)}
            />
          ) : (
            <div className="space-x-2 flex items-center">
              <span className="text-base">{listingInfo?.price}</span>
              <span className="text-sm">TAT</span>
            </div>
          )}
        </div>
        <div className="flex space-x-4 justify-start">
          {!!listingInfo ? (
            <>
              {accountAddress !== listingInfo.seller && (
                <button className="btn btn-success btn-sm px-2 rounded-md" onClick={buy}>
                  Buy
                </button>
              )}
              {accountAddress === listingInfo.seller && (
                <button className="btn btn-error btn-sm px-2 rounded-md" onClick={takedown}>
                  Takedown
                </button>
              )}
            </>
          ) : (
            <button
              className="btn btn-primary btn-sm px-2 rounded-md"
              onClick={listing}
              disabled={isListingInfo.current?.tokenId === BigInt(nft!.id)}
            >
              {isListingInfo.current?.tokenId === BigInt(nft!.id) ? "Listed" : "List"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
