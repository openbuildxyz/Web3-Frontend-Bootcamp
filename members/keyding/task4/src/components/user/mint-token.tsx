"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TokenABI } from "@/lib/abi"
import { CoinsIcon, LoaderIcon, ZapIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { parseUnits } from "viem"
import { useAccount, useWriteContract } from "wagmi"
import { HashType } from '@/types'

interface MintTokenProps {
  onMint?: () => void
  symbol: string
}

export function MintToken({ onMint, symbol }: MintTokenProps) {
  const [isMinting, setMinting] = useState(false)
  const [open, setOpen] = useState(false)
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const handleMint = () => {
    if (!address) {
      toast.warning("Hi, Boss! 👋 Please link your wallet first!")
      return
    }

    setMinting(true)

    writeContractAsync({
      abi: TokenABI,
      address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as HashType,
      functionName: "mint",
      args: [address, parseUnits("1000", 18)],
    })
      .then(() => {
        toast.success(`Hi, Boss! 👋 Mint 1000 ${symbol} Tokens success!`)
        onMint?.()
        setOpen(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Hi, Boss! 👋 Mint Tokens failure!")
      })
      .finally(() => {
        setMinting(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isMinting}
          className="rounded-full flex-1 flex items-center gap-2 mx-2"
          size="sm"
        >
          <CoinsIcon size={14} />
          <span>Mint Token</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Mint {symbol} Tokens</DialogTitle>
          <DialogDescription>
            Click on the &quot;Mint&quot; to mint 1000 {symbol} tokens for
            yourself!
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col items-center justify-center gap-2 py-4">
          <h2 className="text-sm text-foreground/70">Tokens</h2>
          <span className="text-xl font-bold">
            {(1000).toLocaleString("en-US")} {symbol}
          </span>
        </div>
        <DialogFooter>
          <div className="w-full flex items-center justify-center gap-4">
            <Button
              className="rounded-full"
              variant="outline"
              onClick={() => setOpen(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex items-center justify-center gap-1 rounded-full"
              disabled={isMinting}
              onClick={handleMint}
              size="sm"
            >
              {isMinting ? (
                <LoaderIcon size={14} className="animate-spin" />
              ) : (
                <ZapIcon size={14} />
              )}
              <span>Mint</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
