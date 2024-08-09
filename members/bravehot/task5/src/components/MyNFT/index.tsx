"use client";
import { useMemo } from "react";
import dayjs from "dayjs";

import { serialize, useAccount, useReadContract } from "wagmi";
import NFTItem from "./NFTItem";

import { isEmpty } from "lodash-es";

import { abi } from "@/abi/NFTMarket";
import { Frown } from "lucide-react";

const MyNFT: React.FC = () => {
  const account = useAccount();
  console.log("account: ", account);

  const listItemResult = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    functionName: "getMyNFT",
  });

  const myListNFT = useMemo(() => {
    if (isEmpty(listItemResult.data)) return [];

    if (Array.isArray(listItemResult.data)) {
      return listItemResult.data
        .map((item) => {
          return {
            ...item,
            price: JSON.parse(serialize(item.price)).value,
            tokenId: JSON.parse(serialize(item.tokenId)).value,
          };
        })
        .filter((item) => item.seller === account?.address);
    }
    return [];
  }, [listItemResult]);

  return myListNFT.length ? (
    <div className="w-full grid grid-cols-4 gap-2">
      {myListNFT.map((item, index) => (
        <NFTItem key={index} tokenId={item.tokenId} info={item} />
      ))}
    </div>
  ) : (
    <div className="w-full flex justify-center items-center flex-col mt-10">
      <Frown size={84} className="mb-5" />
      <p className="font-medium text-center text-2xl">No NFTs listed by you</p>
    </div>
  );
};

export default MyNFT;
