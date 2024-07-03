"use client";
import { useMemo } from "react";
import Image from "next/image";
import {
  useReadContract,
  useWatchContractEvent,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useToast } from "@/components/ui/use-toast";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { abi } from "@/abi/LouNFT";
import { abi as MarketAbi } from "@/abi/NFTMarket";

import type { NFTInter } from "@/@types";

type Props = {
  tokenId: string | number;
  info: NFTInter;
};

const BASE_URL = "https://black-many-mandrill-971.mypinata.cloud/ipfs/";

const NFTItem: React.FC<Props> = ({ tokenId, info }) => {
  const { toast } = useToast();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useWatchContractEvent({
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    abi,
    eventName: "NFTListed",
    onLogs(logs: any) {
      console.log("logs: ", logs);
      toast({
        title: "NFT List Success",
      });
    },
  });

  const tokenURL = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_ERC721_ADDRESS as any,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const NFTURL = useMemo(() => {
    if (!tokenURL.data) return "";

    const [, tokenUrl] = String(tokenURL.data)?.split(".cloud");

    return tokenUrl ?? "";
  }, [tokenURL]);

  const handleBuy = () => {
    console.log("MarketAbi: ", MarketAbi);

    writeContract({
      address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
      abi: MarketAbi,
      functionName: "purchaseNFT",
      args: [1],
    });
  };

  return (
    <Card className="p-2">
      <div className="relative w-full rounded min-h-[200px] flex flex-col justify-center items-center">
        {NFTURL && (
          <div className="w-full h-[280px]">
            <img
              src={`${BASE_URL}${NFTURL}`}
              alt="nft"
              className="w-full h-[280px] rounded-md z-0 relative"
            ></img>
          </div>
        )}

        <div className="bg-[#f5f5f5] dark:bg-[#282828] w-full p-4 rounded-md my-2">
          <div className="w-full flex justify-between">
            <div>
              <div className="text-sm">Token Id:</div>
              <div className="font-medium">{info.tokenId}</div>
            </div>

            <div>
              <div className="text-sm">Price:</div>
              <div className="text-primary font-medium">{info.price} LOU</div>
            </div>
          </div>

          <div className="w-full mt-2">
            <div className="text-sm">NFT Contract:</div>
            <HoverCard>
              <HoverCardTrigger>
                <div className="font-medium w-full overflow-hidden text-ellipsis">
                  {info.nftContract}
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-[450px]">
                {info.seller}
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        {!info.isActive && (
          <div className="absolute right-0 z-10">
            <Image
              src={`/images/sold.png`}
              alt="sold out"
              width={180}
              height={800}
            />
          </div>
        )}

        <div className="w-full flex justify-between items-center">
          <HoverCard>
            <HoverCardTrigger>
              <Avatar className="mr-8 cursor-pointer w-[30px] h-[30px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-[450px]">
              {info.seller}
            </HoverCardContent>
          </HoverCard>

          <Button
            className="w-[140px]"
            disabled={!info.isActive}
            onClick={() => handleBuy()}
          >
            Buy
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NFTItem;
