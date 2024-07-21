/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  NFTItem,
  ftContractUtils,
  nftContractUtils,
} from "../utils/contractUtils";

export function ProfilePage() {
  const { address } = useAccount();
  const [ownNFTs, setOwnNFTs] = useState<NFTItem[]>([]);

  useEffect(() => {
    async function getOwnNFTs() {
      if (!address) {
        return [];
      }
      return await nftContractUtils.getAddressNFTs(address);
    }
    getOwnNFTs().then(setOwnNFTs);
  }, [address]);

  const [balance, setBalance] = useState<string>();

  const refreshBalance = useCallback(() => {
    if (!address) {
      setBalance(undefined);
    } else {
      ftContractUtils.getAddressBalance(address).then(setBalance);
    }
  }, [address]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  return (
    <div className="px-4 mt-4">
      <ul className="mb-10">
        <li className=" text-end">
          Balance: {balance || "0.0"} {` `}
          <a
            href="https://sepolia.etherscan.io/token/0x9546Da8C91CFF054690431ffbEd9d96F0aD4eD58"
            target="_blank"
            className="underline text-primaryColor"
          >
            HT
          </a>
        </li>
      </ul>
      <div className="flex flex-wrap gap-4">
        {ownNFTs.map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden group w-[calc(100vw_-_32px)] sm:w-[260px] duration-200 cursor-pointer shadow-lg hover:shadow-xl"
          >
            <div className="w-full aspect-square overflow-hidden">
              <div
                className="w-full h-full bg-center bg-cover group-hover:scale-110 duration-300"
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
              ></div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-center gap-x-4 text-lg font-bold">
                <span className="flex-1 line-clamp-1">{item.name}</span>
                <span>#{item.id}</span>
              </div>
              <p className="italic text-sm mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
