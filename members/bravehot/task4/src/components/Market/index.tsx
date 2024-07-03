"use client";
import { useMemo } from "react";
import { serialize, useReadContract, useWatchContractEvent } from "wagmi";
import { isEmpty } from "lodash-es";

import NFTItem from "../NFTItem";

import { abi } from "@/abi/NFTMarket";

import type { NFTInter } from "@/@types";

const Market: React.FC = () => {
  const listItemResult = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    functionName: "getListedItem",
  });

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    abi,
    eventName: "NFTListed",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });

  const listItem = useMemo<NFTInter[]>(() => {
    if (isEmpty(listItemResult.data)) return [];

    if (Array.isArray(listItemResult.data)) {
      return listItemResult.data.map((item) => ({
        ...item,
        price: JSON.parse(serialize(item.price)).value,
        tokenId: JSON.parse(serialize(item.tokenId)).value,
      }));
    }

    return [];
  }, [listItemResult]);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-4 gap-2">
        {listItem.map((item, index) => (
          <NFTItem key={index} tokenId={item.tokenId} info={item} />
        ))}
      </div>
    </div>
  );
};

export default Market;
