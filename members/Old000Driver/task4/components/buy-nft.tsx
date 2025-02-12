"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { NFTMarketABI } from "@/constants/abi";
import { toast } from "sonner";
import { ListingNFT } from "@/utils/fetchListings";

interface BuyNFTProps {
  nft: ListingNFT;
  onBuyNFT: (tokenId: string) => void;
}

export function BuyNFT({ nft, onBuyNFT }: BuyNFTProps) {
  const [open, setOpen] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const handleBuy = async () => {
    if (isConfirming) return;

    try {
      console.log("提交购买交易...");
      const result = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketABI,
        functionName: "buyNFT",
        args: [nft.nftContract, BigInt(nft.tokenId)],
      });

      console.log("writeContractAsync 返回值:", result);
      if (typeof result === "string") {
        setTxHash(result as `0x${string}`);
      } else if (result.hash) {
        setTxHash(result.hash);
      } else {
        throw new Error("无法获取交易哈希");
      }

      toast.success("交易已提交");
    } catch (error) {
      console.error("购买失败:", error);
      toast.error(error instanceof Error ? error.message : "未知错误");
    }
  };

  // 监听交易确认
  useEffect(() => {
    if (isSuccess && txHash) {
      toast.success("购买成功");
      onBuyNFT(nft.tokenId);
      setTxHash(undefined);
      setOpen(false); // 关闭对话框
    }
  }, [isSuccess, txHash, onBuyNFT, nft.tokenId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy NFT</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to buy this NFT?</p>
          <p>Name: {nft.name}</p>
          <p>Price: {nft.price} MTK</p>
          <p>Seller: {nft.seller}</p>
          <Button onClick={handleBuy} disabled={isConfirming}>
            {isConfirming ? "Buying..." : "Confirm Purchase"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
