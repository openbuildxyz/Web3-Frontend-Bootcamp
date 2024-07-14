"use client"

import { useAccount } from "wagmi"

import { Mint } from "@/components/mint"
import { ListNFT } from "@/components/list-nft"

export const Actions = () => {
  const { isConnected } = useAccount()
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="flex gap-8">
        <Mint isConnected={isConnected} />
        <ListNFT isConnected={isConnected} />
      </div>
    </div>
  )
}
