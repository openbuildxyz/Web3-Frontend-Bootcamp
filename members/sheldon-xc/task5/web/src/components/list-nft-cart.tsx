import { useWriteContract, useAccount } from "wagmi";
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
import { useToast } from "@/components/ui/use-toast";
import type { ListNFTCardProps } from "@/types/list";

import NFTPNG from "../../public/nft.png";

import { formatAddress, formatBalance } from "@/lib/utils";
import TokenAbi from "@/abi/Token";
import dayjs from "dayjs";

export function ListNFTCard(props: ListNFTCardProps) {
  const { writeContractAsync, isPending, error, failureReason, isSuccess } =
    useWriteContract();
  const { address } = useAccount();
  const { toast } = useToast();

  const seller = formatAddress(props.seller);

  const nftContract = formatAddress(props.nftContract);
  const nftPrice = formatBalance(Number(props.price) || 0);
  const urlObj = new URL(props.tokenURI);
  const nftImg =
    urlObj.hostname === "i.imgur.com" &&
    /\.(jpg|jpeg|png|gif|bmp)$/i.test(props.tokenURI)
      ? props.tokenURI
      : NFTPNG;

  const listTime = dayjs(Number(props.timestamp) * 1000).format(
    "DD/MM/YYYY HH:mm:ss"
  );

  const unSellHandle = () => {
    writeContractAsync({
      abi: NFTMarketAbi,
      address: NFT_MARKET_ADDRESS,
      functionName: "removeFromSale",
      args: [NFT_ADDRESS, props.tokenId],
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Success!!!",
          description: "oh! UnSell NFT success.",
          duration: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Oops...",
          description: "Uh oh! Something went wrong.",
          duration: 3000,
        });
        // console.log("mintNFT failed", err);
      });
  };

  const buyHandle = () => {
    writeContractAsync({
      abi: TokenAbi,
      address: TOKEN_ADDRESS,
      functionName: "approve",
      args: [NFT_MARKET_ADDRESS, props.price],
    }).then((res) => {
      writeContractAsync(
        {
          abi: NFTMarketAbi,
          address: NFT_MARKET_ADDRESS,
          functionName: "buyNFT",
          args: [NFT_ADDRESS, props.tokenId],
        },
        {
          onSuccess: (res) => {
            console.log(res);
            toast({
              title: "Success!!!",
              description: "oh! Buy NFT success.",
              duration: 3000,
            });
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
          },
        }
      ).catch((err) => {
        // console.log("mintNFT failed", err);
      });
    });
  };

  const handleImgLoadingError = (e: any) => {
    // default image add, if associated image is not available...
    console.log(e);
    e.target.src = NFTPNG;
  };

  return (
    <Card className="w-[320px] gap-4">
      <CardHeader>
        <CardTitle>NFT Card</CardTitle>
        <CardDescription>{`#${props.tokenId}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            NFT Contract: {nftContract}
          </div>
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
          <div className="flex flex-col space-y-1.5">Seller: {seller}</div>
          {/* <div className="flex flex-col space-y-1.5">
            tokenURI: {props.tokenURI}
          </div> */}
          <div className="flex flex-col space-y-1.5">
            Price: {`${nftPrice} SC`}
          </div>
          <div className="flex flex-col space-y-1.5">
            List Time: {`${listTime}`}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {props.seller === address ? (
          <Button type="submit" onClick={unSellHandle} size="sm">
            UnSell
          </Button>
        ) : (
          <Button type="submit" onClick={buyHandle} size="sm">
            Buy
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
