import { useWriteContract, useAccount } from "wagmi";

import { useState } from "react";

import NFTMarketAbi from "@/abi/NFTMarket";
import Image from "next/image";
import {
  TOKEN_ADDRESS,
  NFT_ADDRESS,
  NFT_MARKET_ADDRESS,
} from "@/config/constant-config";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import type { MineNFTCardProps } from "@/types/mine";
import NFTAbi from "@/abi/NFT";

import NFTPNG from "../../public/nft.png";

export function MineNFTCard(props: MineNFTCardProps) {
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();

  const [sellOpen, setSellOpen] = useState(false);
  const [tokenPrice, setTokenPrice] = useState("");

  const urlObj = new URL(props.tokenURI);
  const nftImg =
    urlObj.hostname === "i.imgur.com" &&
    /\.(jpg|jpeg|png|gif|bmp)$/i.test(props.tokenURI)
      ? props.tokenURI
      : NFTPNG;

  const handleImgLoadingError = (e: any) => {
    // default image add, if associated image is not available...
    console.log(e);
    e.target.src = NFTPNG;
  };

  const sellHandle = () => {
    writeContractAsync({
      abi: NFTAbi,
      address: NFT_ADDRESS,
      functionName: "setApprovalForAll",
      args: [NFT_MARKET_ADDRESS, true],
    }).then((res) => {
      writeContractAsync(
        {
          abi: NFTMarketAbi,
          address: NFT_MARKET_ADDRESS,
          functionName: "listNFT",
          args: [NFT_ADDRESS, props.tokenId, TOKEN_ADDRESS, tokenPrice],
        },
        {
          onSuccess: (res) => {
            console.log(res);
            toast({
              title: "Success!!!",
              description: "oh! Sell NFT success.",
              duration: 3000,
            });
            setSellOpen(false);
          },
          onSettled: (res) => {
            console.log(res);
          },
          onError: (e) => {
            console.log(e);
            toast({
              variant: "destructive",
              title: "Oops...",
              description: "Uh oh! Something went wrong.",
              duration: 3000,
            });
            setSellOpen(false);
          },
        }
      ).catch((err) => {
        setSellOpen(false);
        // console.log("mintNFT failed", err);
      });
    });
  };

  return (
    <Card className="w-[220px] gap-4">
      <CardHeader>
        <CardTitle>NFT Card</CardTitle>
        <CardDescription>{`#${props.tokenId}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Image
              style={{
                width: "100%",
                height: "auto",
              }}
              width={100}
              height={100}
              src={nftImg}
              alt={`${props.tokenURI} NFT Image`}
              onError={handleImgLoadingError}
            />
          </div>
          <div className="flex flex-col space-y-1.5">{props.mintTime}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Sell</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Sell NFT</h4>
                <p className="text-sm text-muted-foreground">
                  Sell your NFT on NFT marketplace.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="tokenPrice">NFT Price</Label>
                  <Input
                    id="tokenPrice"
                    defaultValue="0"
                    className="col-span-2 h-8"
                    onChange={(e) => setTokenPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button type="submit" onClick={sellHandle} size="sm">
                Confirm
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
