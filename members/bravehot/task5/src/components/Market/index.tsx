"use client";
import { useMemo } from "react";
import { serialize, useReadContract, useWatchContractEvent } from "wagmi";
import { isEmpty } from "lodash-es";
import { Frown } from "lucide-react";

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
      const logInfo: any = logs?.[0];
      if (logInfo && logInfo.eventName === "NFTListed") {
        listItemResult.refetch();
      }
    },
  });

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    abi,
    eventName: "NFTPurchased",
    onLogs(logs) {
      const logInfo: any = logs?.[0];
      if (logInfo && logInfo.eventName === "NFTPurchased") {
        listItemResult.refetch();
      }
    },
  });

  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    abi,
    eventName: "NFTUnList",
    onLogs(logs) {
      const logInfo: any = logs?.[0];
      if (logInfo && logInfo.eventName === "NFTUnList") {
        listItemResult.refetch();
      }
    },
  });

  const listItem = useMemo<NFTInter[]>(() => {
    if (isEmpty(listItemResult.data)) return [];

    if (Array.isArray(listItemResult.data)) {
      console.log("listItemResult.data: ", listItemResult.data);
      return listItemResult.data
        .map((item) => ({
          ...item,
          price: JSON.parse(serialize(item.price)).value,
          tokenId: JSON.parse(serialize(item.tokenId)).value,
        }))
        .filter((item) => item.isList);
    }

    return [];
  }, [listItemResult]);

  return (
    <div className="w-full flex-1 h-full">
      {listItem.length ? (
        <div className="w-full grid grid-cols-4 gap-2">
          {listItem.map((item, index) => (
            <NFTItem key={index} tokenId={item.tokenId} info={item} />
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col mt-10">
          <Frown size={84} className="mb-5" />
          <p className="font-medium text-center text-2xl">No NFTs listed</p>
        </div>
      )}
    </div>
  );
};

export default Market;
