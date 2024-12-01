import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import type { Address } from "viem";
import { parseEther } from "viem";
import { useReadContract, useWriteContract } from "wagmi";
import { Contract } from "~/constants";

export default function NFTCard({
  seller,
  tokenId,
  nftContract,
  price,
}: {
  seller: Address;
  tokenId: string;
  nftContract: Address;
  price: string;
}) {
  const { writeContractAsync } = useWriteContract();
  const tokenURL = useReadContract({
    ...Contract.NFT,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  const tokenSymbol = useReadContract({
    ...Contract.Token,
    functionName: "symbol",
  });

  const buyNFT = async (
    nftContract: Address,
    tokenId: string,
    price: string,
  ) => {
    const fn = async () => {
      await writeContractAsync({
        ...Contract.Token,
        functionName: "approve",
        args: [Contract.NFTMarket.address, parseEther(price)],
      });

      await writeContractAsync({
        ...Contract.NFTMarket,
        functionName: "buyNFT",
        args: [nftContract, BigInt(tokenId)],
      });
    };

    await toast.promise(fn(), {
      loading: "Buying NFT...",
      success: "Successfully bought NFT",
      error: "Failed to buy NFT",
    });
  };

  const unlistItem = async (nftContract: Address, tokenId: string) => {
    writeContractAsync({
      ...Contract.NFTMarket,
      functionName: "unlistItem",
      args: [nftContract, BigInt(tokenId)],
    });
  };

  return (
    <Card className="cursor-pointer">
      <CardHeader className="flex items-center justify-between">
        <div>tokenId: {tokenId}</div>
        <Button
          size="sm"
          color="danger"
          onClick={() => unlistItem(nftContract, tokenId)}
        >
          unList
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          seller :{" "}
          <Tooltip content={seller}>
            <span className="cursor-pointer">
              {`${seller.slice(0, 4)}...${seller.slice(-4)}`}
            </span>
          </Tooltip>
        </div>
        <div>
          nftContract:{" "}
          <Tooltip content={nftContract}>
            <span className="cursor-pointer">
              {`${nftContract.slice(0, 4)}...${nftContract.slice(-4)}`}
            </span>
          </Tooltip>
        </div>
        <div>tokenURL: {tokenURL.data}</div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div>{price + tokenSymbol.data}</div>
        <Button size="sm" onClick={() => buyNFT(nftContract, tokenId, price)}>
          buy
        </Button>
      </CardFooter>
    </Card>
  );
}
