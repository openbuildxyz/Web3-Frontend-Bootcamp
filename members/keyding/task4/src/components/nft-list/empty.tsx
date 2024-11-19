"use client"

import { ListNFT } from "@/components/list-nft"
import { MintNFT } from "@/components/mint-nft"

interface EmptyProps {
  onListed?: () => void
}

export function Empty({ onListed }: EmptyProps) {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center gap-2">
      <span className="text-xl text-foreground font-bold">
        No NFTs have been listed.
      </span>
      <span className="text-base text-foreground/60">
        You can start selling after listing the NFT.
      </span>
      <div className="flex items-center justify-center gap-4 mt-6">
        <MintNFT buttonMode />
        <span className="text-foreground/60 text-sm"> or </span>
        <ListNFT onListed={onListed} />
      </div>
    </div>
  )
}
