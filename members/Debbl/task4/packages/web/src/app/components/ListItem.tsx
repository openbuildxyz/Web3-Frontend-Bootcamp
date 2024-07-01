import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import type { Address } from "viem";
import { formatEther, parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { toast } from "react-hot-toast";
import { Contract } from "~/constants";

export interface NFTInfo {
  nftContractAddress: Address;
  tokenId: bigint;
  price: bigint;
}

export default function ListItem() {
  const { writeContractAsync } = useWriteContract();
  const [nftInfo, setNftInfo] = useState<NFTInfo>({
    nftContractAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    tokenId: 0n,
    price: 0n,
  });
  const [isLoading, setIsLoading] = useState(false);

  const listItem = async ({ nftContractAddress, tokenId, price }: NFTInfo) => {
    setIsLoading(true);

    try {
      await writeContractAsync({
        ...Contract.NFT,
        functionName: "approve",
        args: [Contract.NFTMarket.address, tokenId],
      });

      await writeContractAsync({
        ...Contract.NFTMarket,
        functionName: "listItem",
        args: [nftContractAddress, tokenId, price],
      });
    } catch (err: any) {
      toast.error("error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {isLoading && (
        <Spinner
          classNames={{
            base: "bg-gray-200/80 rounded-sm fixed inset-0 z-20",
          }}
          size="lg"
        />
      )}

      <h3>ListItem</h3>
      <div className="flex items-center gap-x-2">
        <div className="flex flex-col gap-y-2">
          <Input
            label="nftContractAddress"
            className="w-60"
            size="sm"
            type="text"
            value={nftInfo.nftContractAddress}
            onChange={(e) =>
              setNftInfo((s) => ({
                ...s,
                nftContractAddress: e.target.value as Address,
              }))
            }
          />
          <Input
            label="tokenId"
            className="w-60"
            size="sm"
            type="text"
            value={nftInfo.tokenId.toString()}
            onChange={(e) =>
              setNftInfo((s) => ({
                ...s,
                tokenId: BigInt(e.target.value),
              }))
            }
          />
          <Input
            label="price"
            className="w-60"
            size="sm"
            type="text"
            value={formatEther(nftInfo.price)}
            onChange={(e) =>
              setNftInfo((s) => ({
                ...s,
                price: parseEther(e.target.value),
              }))
            }
          />
        </div>
        <Button onClick={() => listItem(nftInfo)}>list</Button>
      </div>
    </div>
  );
}
