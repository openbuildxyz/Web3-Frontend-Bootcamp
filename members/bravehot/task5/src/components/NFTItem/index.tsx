"use client";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import { injected } from "wagmi/connectors";

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
import { abi as TokenAbi } from "@/abi/LouToken";
import { abi as MarketAbi } from "@/abi/NFTMarket";

import type { NFTInter } from "@/@types";

type Props = {
  tokenId: string | number;
  info: NFTInter;
};

const BASE_URL = "https://black-many-mandrill-971.mypinata.cloud/ipfs/";

const NFTItem: React.FC<Props> = ({ tokenId, info }) => {
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  const { toast } = useToast();
  const {
    data: buyHash,
    error: buyError,
    isPending: isBuying,
    writeContract: writeBuyContract,
  } = useWriteContract();

  const {
    data: approveHash,
    error: approveError,
    isPending: isApproving,
    writeContract: writeApproveContract,
  } = useWriteContract();

  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const { isSuccess: isBuySuccess } = useWaitForTransactionReceipt({
    hash: buyHash,
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

  const handleBuy = async () => {
    if (!isConnected) {
      await connect({ connector: injected() });
    }
    writeApproveContract({
      address: process.env.NEXT_PUBLIC_ERC20_ADDRESS as any,
      abi: TokenAbi,
      functionName: "approve",
      args: [process.env.NEXT_PUBLIC_MARKET_ADDRESS as any, info.price],
    });
  };

  useEffect(() => {
    if (isApproveSuccess) {
      writeBuyContract({
        address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
        abi: MarketAbi,
        functionName: "purchaseNFT",
        args: [info.tokenId],
      });
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isBuySuccess) {
      toast({
        title: "Buy Success",
        description: "You have successfully bought the NFT",
      });
    }
  }, [isBuySuccess]);

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
              <div className="text-primary font-medium">
                {info.price}
                LOU
              </div>
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

          <div className="w-full mt-2">
            <div className="text-sm">Listed Time: </div>
            <div className="font-medium">
              {dayjs(Number(info.listTime) * 1000).format(
                "DD/MM/YYYY HH:MM:ss"
              )}
            </div>
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
      <Toaster />
    </Card>
  );
};

export default NFTItem;
