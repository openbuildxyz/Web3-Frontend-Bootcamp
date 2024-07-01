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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NFTABI, NFTMarketPlaceABI, TokenABI } from "@/lib/abi"
import { useTransactionReceipts } from "@/lib/hooks"
import type { HashType } from "@/types"
import { ArrowBigUpDashIcon, LoaderIcon, ZapIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { formatEther, parseUnits } from "viem"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { TokenIDSelect } from "./token-id-select"
import { TokenURISelect } from "./token-uri-select"

interface ListNFTProps {
  size?: "small" | "normal"
  listingId?: bigint
  onListed?: () => void
}

export function ListNFT({ size, onListed, listingId }: ListNFTProps) {
  const TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS as HashType
  const NFT_MARKETPLACE_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS as HashType

  const { address } = useAccount()
  const [tokenURI, setTokenURI] = useState("")
  const [uriIcon, setURIIcon] = useState("")
  const [tokenId, setTokenId] = useState<number | undefined>()
  const [price, setPrice] = useState("")
  const [open, setOpen] = useState(false)

  const [isListing, setIsListing] = useState(false)
  const [isSmallBtn, setIsSmallBtn] = useState(false)
  const [hasListingId, setHasListingId] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const [txHashes, setTxHashes] = useState<HashType[]>([])
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const receipts = useTransactionReceipts(txHashes)

  const { data: symbol } = useReadContract({
    abi: TokenABI,
    address: TOKEN_CONTRACT_ADDRESS,
    functionName: "symbol",
  })

  const { data: nftInfo } = useReadContract({
    abi: NFTMarketPlaceABI,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: "getListedNft",
    args: hasListingId ? [listingId!] : undefined,
  })

  // Get TX hashes from localStorage
  useEffect(() => {
    if (open && address) {
      const txHashes = JSON.parse(
        localStorage.getItem(address) || "[]",
      ) as HashType[]
      setTxHashes(txHashes)
    }
  }, [open, address])

  // Get tokenIds from receipts
  useEffect(() => {
    const tokenIds = receipts.map((receipt) =>
      Number.parseInt(receipt.logs[0].topics[3] as string, 16),
    )
    setTokenIds(tokenIds)
  }, [receipts])

  useEffect(() => {
    setIsSmallBtn(size === "small")
  }, [size])

  useEffect(() => {
    setHasListingId(listingId !== undefined)
  }, [listingId])

  useEffect(() => {
    if (nftInfo) {
      const { uri, tokenId, price } = nftInfo

      setTokenURI(uri)
      setTokenId(Number(tokenId))
      setPrice(formatEther(price))
    }
  }, [nftInfo])

  useEffect(() => {
    setURIIcon(`/icons/${tokenURI}.svg`)
  }, [tokenURI])

  const handleList = () => {
    if (!address) {
      toast.warning("Hi, Boss! 👋 Please link your wallet first!")
      return
    }
    if (!tokenURI) {
      toast.warning("Hi, Boss! 👋 Please select your token URI!")
      return
    }
    if (tokenId === undefined) {
      toast.warning("Hi, Boss! 👋 Please select your NFT token id!")
      return
    }
    if (!price || Number(price) <= 0) {
      toast.warning("Hi, Boss! 👋 Please enter an NFT price greater than 0!")
      return
    }

    setIsListing(true)

    writeContractAsync({
      abi: NFTABI,
      address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as HashType,
      functionName: "setApprovalForAll",
      args: [
        process.env.NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS as HashType,
        true,
      ],
    })
      .then(() => {
        writeContractAsync({
          abi: NFTMarketPlaceABI,
          address: process.env
            .NEXT_PUBLIC_NFT_MARKETPLACE_CONTRACT_ADDRESS as HashType,
          functionName: "listNFT",
          args: hasListingId
            ? [listingId!, parseUnits(price.toString(), 18)]
            : [
                process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as HashType,
                BigInt(tokenId),
                tokenURI,
                parseUnits(price.toString(), 18),
              ],
        })
          .then(() => {
            toast.success("Hi, Boss! 👋 Your NFT is listed success!")
            setOpen(false)
            onListed?.()

            if (!hasListingId) {
              // remove the listed token id
              const tokenIdIndex = tokenIds.findIndex((id) => id === tokenId)
              tokenIdIndex !== undefined && txHashes.splice(tokenIdIndex, 1)
              localStorage.setItem(address, JSON.stringify(txHashes))
            }
          })
          .catch((error) => {
            console.log(error)
            toast.error("Hi, Boss! 👋 List NFT failed:", error.message)
          })
          .finally(() => {
            setIsListing(false)
          })
      })
      .catch((error) => {
        console.log(error)
        toast.error("Hi, Boss! 👋 Approval failed:", error.message)
        setIsListing(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isListing}
          className="flex items-center gap-2"
          size={isSmallBtn ? "sm" : "default"}
        >
          {!isSmallBtn && <ArrowBigUpDashIcon size={20} />}
          <span className="text-sm">List{isSmallBtn ? "" : " NFT"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>List NFT</DialogTitle>
          <DialogDescription>
            Input your NFT information here. Click &quot;List&quot; when
            finished.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4">
            <div />
            <div className="w-[200px] h-[140px] rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-lg shadow-lg">
              {tokenURI && (
                <Image src={uriIcon} alt="NFT" width={100} height={100} />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Token URI</Label>
            {hasListingId ? (
              <Input
                className="w-[200px] col-span-3 text-foreground/60"
                disabled
                value={tokenURI}
              />
            ) : (
              <TokenURISelect value={tokenURI} onChange={setTokenURI} />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">NFT Contract</Label>
            <Input
              placeholder="Your NFT contract address"
              className="col-span-3 text-foreground/60"
              disabled
              value={process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Token ID</Label>
            {hasListingId ? (
              <Input
                className="w-[200px] col-span-3 text-foreground/60"
                disabled
                value={`# ${tokenId}`}
              />
            ) : (
              <TokenIDSelect data={tokenIds} onChange={setTokenId} />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <div className="flex items-center gap-3 col-span-3">
              <Input
                id="price"
                className="w-[200px]"
                placeholder="Your NFT price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="text-sm text-foreground/80">{symbol}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="rounded-full"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-1 rounded-full"
            disabled={isListing}
            onClick={handleList}
          >
            {isListing ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              <ZapIcon size={16} />
            )}
            <span>List</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
