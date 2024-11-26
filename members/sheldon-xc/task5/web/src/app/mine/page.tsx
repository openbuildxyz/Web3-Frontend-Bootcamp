"use client";

import { useState } from "react";
import { useWriteContract, useAccount, useReadContract } from "wagmi";

import NFTAbi from "@/abi/NFT";
import { NFT_ADDRESS } from "@/config/constant-config";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MineNFTCard } from "@/components/mine-nft-cart";

import { MineNFTCardProps } from "@/types/mine";

export default function Mine() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();

  const [tokenURI, setTokenURI] = useState("");
  const [mintOpen, setMintOpen] = useState(false);

  // get user nfts
  const { data: mineNFTs } = useReadContract({
    abi: NFTAbi,
    address: NFT_ADDRESS,
    functionName: "tokenDetailsOfOwner",
    args: [address],
  });

  const nfts = (mineNFTs || []) as MineNFTCardProps[];

  const mintHandle = () => {
    writeContractAsync({
      abi: NFTAbi,
      address: NFT_ADDRESS,
      functionName: "safeMint",
      args: [address, tokenURI],
    })
      .then((res) => {
        console.log(res);
        toast({
          title: "Success!!!",
          description: "oh! Mint NFT success.",
          duration: 3000,
        });
        setMintOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Oops...",
          description: "Uh oh! Something went wrong.",
          duration: 3000,
        });
        setMintOpen(false);
        // console.log("mintNFT failed", err);
      });
  };

  return (
    <main className="flex-1 px-8 py-4">
      <div className="mb-4">
        <Dialog open={mintOpen} onOpenChange={setMintOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Mint NFT
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mint NFT</DialogTitle>
              <DialogDescription>Mint your NFT</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tokenURI" className="text-right">
                  tokenURI
                </Label>
                <Input
                  id="tokenURI"
                  value={tokenURI}
                  onChange={(e) => setTokenURI(e.target.value)}
                  placeholder="Please enter your nft tokenURI"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={mintHandle} size="sm">
                Mint
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4 flex-wrap">
        {nfts.map((nft) => (
          <MineNFTCard key={nft.tokenId} {...nft} />
        ))}
      </div>
    </main>
  );
}
