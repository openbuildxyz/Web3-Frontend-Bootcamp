"use client"

import { ListNFT } from "@/components/list-nft"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { NFTMarketPlaceABI, TokenABI } from "@/lib/abi"
import { COLOR_TO_CLASS_MAP } from "@/lib/constants"
import { LoaderIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatEther } from "viem"
import { useAccount, useWriteContract } from "wagmi"
import type { NFT } from "./index"
import { HashType } from '@/types'

interface NFTItemProps {
  data: NFT
  symbol: string
  onDelist?: (listingId: bigint) => void
  onBuy?: (listingId: bigint) => void
  onListed?: (listingId: bigint) => void
}

export function NFTItem({
  data,
  onDelist,
  onBuy,
  onListed,
  symbol,
}: NFTItemProps) {
  const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as HashType
  const NFT_MARKETPLACE_CONTRACT_ADDRESS = process.env
          .NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS as HashType
  const [loading, setLoading] = useState(false)
  const [submitLabel, setSubmitLabel] = useState("Buy")
  const { address } = useAccount()
  const {
    listingId,
    uri,
    owner,
    nftContract,
    tokenId,
    price,
    color,
    isSold,
    isListed,
    listedAt,
  } = data
  const nftUri = `/icons/${uri}.svg`
  const className = `rounded-3xl flex flex-col items-center p-4 gap-2 bg-gradient-to-b ${COLOR_TO_CLASS_MAP[color].from} ${COLOR_TO_CLASS_MAP[color].to}`
  const avatarPath = `https://api.multiavatar.com/${owner.slice(2, 10)}.png`
  const isOwner = owner === address
  const { writeContractAsync } = useWriteContract()

  useEffect(() => {
    isOwner
      ? setSubmitLabel(isListed ? "Delist" : "List")
      : setSubmitLabel(isSold ? "Sold" : "Buy")
  }, [isOwner, isSold, isListed])

  const handleNFT = () => {
    if (!address) {
      toast.warning("Hi, Boss! 👋 Please link your wallet first!")
      return
    }
    setLoading(true)
    // Delist
    if (isOwner) {
      writeContractAsync({
        abi: NFTMarketPlaceABI,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
        functionName: "delistNFT",
        args: [listingId],
      })
        .then(() => {
          toast.success(
            `Hi, Boss! 👋 ${isListed ? "Delist" : "List"} NFT success!`,
          )
          onDelist?.(listingId)
        })
        .catch((error) => {
          console.log(error)
          toast.error(
            `Hi, Boss! 👋 ${isListed ? "Delist" : "List"} NFT failure!`,
          )
        })
        .finally(() => {
          setLoading(false)
        })
      return
    }

    // buy
    writeContractAsync({
      abi: TokenABI,
      address: TOKEN_CONTRACT_ADDRESS,
      functionName: "approve",
      args: [
        NFT_MARKETPLACE_CONTRACT_ADDRESS,
        price,
      ],
    })
      .then(() => {
        writeContractAsync({
          abi: NFTMarketPlaceABI,
          address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
          functionName: "buyNFT",
          args: [listingId],
        })
          .then(() => {
            toast.success("Hi, Boss! 👋 Buy NFT success!")
            onBuy?.(listingId)
          })
          .catch((error) => {
            console.log(error)
            toast.error("Hi, Boss! 👋 Buy NFT failure!")
          })
          .finally(() => {
            setLoading(false)
          })
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        toast.error("Hi, Boss! 👋 Approval token failure!")
      })
  }

  return (
    <div className={className}>
      <div className="w-[80%] h-[140px] rounded-2xl mt-5 flex items-center justify-center bg-white/10 backdrop-blur-lg shadow-lg">
        <Image src={nftUri} alt="NFT" width={100} height={100} />
      </div>
      <div className="text-base font-bold text-center text-foreground line-clamp-1">
        {uri.toUpperCase()}
      </div>
      <div className="flex items-center mt-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarPath} alt="seller" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-sm text-center font-bold text-foreground/80">
        {owner.slice(0, 4)}...{owner.slice(-4)}
      </div>
      <div className="w-full flex flex-col gap-4 px-2 mt-2">
        <div className="w-full flex items-center justify-between">
          <span className="text-sm font-bold text-foreground/50">Token ID</span>
          <span className="font-bold text-sm text-foreground">
            #{Number(tokenId)}
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-sm font-bold text-foreground/50">
            NFT Contract
          </span>
          <span className="font-bold text-sm text-foreground">
            {nftContract.slice(0, 4)}...{nftContract.slice(-4)}
          </span>
        </div>

        <div className="w-full flex items-center justify-between">
          <span className="text-sm font-bold text-foreground/50">
            Listed At
          </span>
          <span className="font-bold text-sm text-foreground">
            {new Date(Number(listedAt) * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Separator className="my-2 bg-foreground/10" />
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-auto">
            <Image src="/eth-icon.svg" alt="eth" width={115} height={182} />
          </div>
          <span className="text-sm text-foreground font-bold">
            {formatEther(price)} {symbol}
          </span>
        </div>
        {isOwner && !isListed ? (
          <ListNFT
            listingId={listingId}
            size="small"
            onListed={() => onListed?.(listingId)}
          />
        ) : (
          <Button
            size="sm"
            disabled={loading || isSold}
            onClick={handleNFT}
            variant={isSold ? "outline" : "default"}
          >
            {loading ? <LoaderIcon size={16} /> : submitLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
