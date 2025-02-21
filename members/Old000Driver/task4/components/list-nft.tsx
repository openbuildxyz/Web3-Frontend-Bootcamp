"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketABI } from "@/constants/abi";
import { parseEther } from "viem";
import { toast } from "sonner";

// MTK 代币地址
const MTK_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MARKET_ERC20_ADDRESS;
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

interface ListNFTProps {
  onSuccess: () => Promise<void>;
}

export function ListNFT({ onSuccess }: ListNFTProps) {
  const [open, setOpen] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: hash, writeContract, isPending } = useWriteContract();

  // 监听交易状态
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 将价格转换为wei (18位精度)
      const priceInWei = parseEther(price);

      // 调用合约的 listNFT 函数
      console.log(
        "🔔",
        NFT_CONTRACT_ADDRESS,
        tokenId,
        priceInWei,
        MTK_TOKEN_ADDRESS
      );
      await writeContract({
        address: process.env
          .NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketABI,
        functionName: "listNFT",
        args: [
          NFT_CONTRACT_ADDRESS,
          tokenId,
          priceInWei, // 使用转换后的价格
          MTK_TOKEN_ADDRESS, // 使用 MTK 代币地址
        ],
      });

      toast.success("NFT listing submitted");
      // 重置表单
      setOpen(false);
      setTokenId("");
      setPrice("");
    } catch (error) {
      console.error("Error listing NFT:", error);
      toast.error("Failed to list NFT. Please check the price format.");
    } finally {
      setIsLoading(false);
    }
  };

  // 交易确认后的处理
  useEffect(() => {
    if (isConfirmed) {
      toast.success("NFT listed successfully!");
      onSuccess(); // 调用刷新函数
    }
  }, [isConfirmed, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>List NFT</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List NFT for Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tokenId">Token ID</Label>
            <Input
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="1"
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price (MTK)</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1.0"
              type="number"
              step="0.01"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isConfirming || isLoading}
          >
            {isPending || isConfirming ? "Confirming..." : "List NFT"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
