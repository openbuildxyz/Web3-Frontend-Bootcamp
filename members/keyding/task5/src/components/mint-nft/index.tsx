"use client"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NFTABI } from "@/lib/abi"
import type { HashType } from "@/types"
import { LoaderIcon, ShellIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useAccount, useWriteContract } from "wagmi"

interface MintNFTProps {
  buttonMode?: boolean
}

export function MintNFT({ buttonMode }: MintNFTProps) {
  const NFT_CONTRACT_ADDRESS = process.env
    .NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as HashType
  const [isMinting, setIsMinting] = useState(false)
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const handleMint = async () => {
    if (!address) {
      toast.warning("Hi, Boss! 👋 Please link your wallet first!")
      return
    }
    setIsMinting(true)

    writeContract(
      {
        abi: NFTABI,
        address: NFT_CONTRACT_ADDRESS,
        functionName: "mint",
      },
      {
        onSuccess(txHash) {
          toast.success("Hi, Boss! 👋 Mint NFT Success!")
          // Save TX hash to localStorage
          const txHashes = JSON.parse(localStorage.getItem(address) || "[]")
          txHashes.push(txHash.toString())
          localStorage.setItem(address, JSON.stringify(txHashes))
        },
        onError(error) {
          console.log(error)
          toast.error("Hi, Boss! 👋 Mint NFT failure!")
        },
        onSettled() {
          setIsMinting(false)
        },
      },
    )
  }

  return buttonMode ? (
    <Button disabled={isMinting} onClick={handleMint}>
      {isMinting ? (
        <LoaderIcon size={16} className="animate-spin" />
      ) : (
        <ShellIcon size={16} />
      )}
      <span className="ml-2">Mint NFT</span>
    </Button>
  ) : (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={isMinting} onClick={handleMint} size="icon">
            {isMinting ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              <ShellIcon size={16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Mint NFT</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
