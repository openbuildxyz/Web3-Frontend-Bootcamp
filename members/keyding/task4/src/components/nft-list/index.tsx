"use client"
import { TokenABI } from "@/lib/abi"
import type { COLOR_TO_CLASS_MAP } from "@/lib/constants"
import { useReadContract } from "wagmi"
import { NFTLoading } from "./loading"
import { NFTItem } from "./nft-item"
import { HashType } from '@/types'

type ColorKeys = keyof typeof COLOR_TO_CLASS_MAP

export interface NFT {
  listingId: bigint
  uri: string
  tokenId: bigint
  nftContract: string
  owner: string
  price: bigint
  color: ColorKeys
  isSold: boolean
  isListed: boolean
  listedAt: bigint
}

interface NFTListProps {
  loading: boolean
  data: NFT[]
  onDelist?: (listingId: bigint) => void
  onBuy?: (listingId: bigint) => void
  onListed?: (listingId: bigint) => void
}

export function NFTList({
  loading,
  data,
  onDelist,
  onBuy,
  onListed,
}: NFTListProps) {
  const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as HashType
  const { data: symbolData } = useReadContract({
    abi: TokenABI,
    address: TOKEN_CONTRACT_ADDRESS,
    functionName: "symbol",
  })

  return loading ? (
    <NFTLoading />
  ) : (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {data.map((data) => (
        <NFTItem
          key={data.listingId}
          data={data}
          symbol={symbolData || ""}
          onDelist={onDelist}
          onBuy={onBuy}
          onListed={onListed}
        />
      ))}
    </div>
  )
}
