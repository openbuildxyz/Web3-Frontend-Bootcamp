"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TokenABI } from "@/lib/abi"
import { UserRoundCheckIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useAccount, useReadContracts } from "wagmi"
import { MintToken } from "./mint-token"
import { HashType } from '@/types'


export function User() {
  const [balance, setBalance] = useState(0)
  const [symbol, setSymbol] = useState("")
  const [avatarPath, setAvatarPath] = useState("")
  const { address } = useAccount()

  const tokenContract = {
    abi: TokenABI,
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as HashType,
  } as const
  const { data, refetch } = useReadContracts({
    contracts: [
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        ...tokenContract,
        functionName: "symbol",
      },
    ],
  })

  useEffect(() => {
    if (data) {
      setBalance(Number(formatEther(data[0].result || BigInt(0))))
      setSymbol(data[1].result || "")
    }
  }, [data])

  useEffect(() => {
    address &&
      setAvatarPath(`https://api.multiavatar.com/${address.slice(2, 10)}.png`)
  }, [address])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRoundCheckIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px]">
        <div className="w-full flex flex-col items-center gap-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-4">
              <Avatar>
                <AvatarImage src={avatarPath} alt="seller" />
                <AvatarFallback>${address?.slice(0, 4)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-center justify-center font-bold text-foreground">
              <span className="text-lg">
                {address?.slice(0, 4)}...{address?.slice(-4)}
              </span>
              <span className="text-sm  text-foreground/80">
                {balance.toLocaleString("en-US")} {symbol}
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-around">
            <MintToken onMint={refetch} symbol={symbol} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
