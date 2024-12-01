"use client"

import Image from "next/image"
import dayjs from "dayjs"
import { useAccount, useWriteContract } from "wagmi"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardInfo } from "@/components/card-info"
import { MyTokenABI, NFTMarketABI } from "@/lib/abis"
import { MyTokenAddress, NFTMarketAddress } from "@/lib/constants"

type Props = {
  seller: string
  tokenid: bigint
  price: bigint
  nftContract: string
  nftURI: string
  listedAt: bigint
}
export const CardItem = ({
  seller,
  tokenid,
  price,
  nftContract,
  nftURI,
  listedAt,
}: Props) => {
  const { address, isConnected } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const canBuy = isConnected && address !== seller

  const formatDate = dayjs(Number(listedAt) * 1000).format(
    "YYYY-MM-DD HH:mm:ss"
  )

  const handleBuy = () => {
    writeContractAsync({
      abi: MyTokenABI,
      address: MyTokenAddress,
      functionName: "approve",
      args: [NFTMarketAddress, price],
    })
      .then((res) => {
        console.log("Aprooval success", res)
        writeContractAsync({
          abi: NFTMarketABI,
          address: NFTMarketAddress,
          functionName: "buyNFT",
          args: [nftContract as `0x${string}`, tokenid],
        })
          .then((res) => console.log("Purchase success", res))
          .catch((error) => console.log("Purchase failed", error))
      })
      .catch((error) => console.log("Approval failed", error))
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{`#${tokenid}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-center">
          <Image
            src={nftURI}
            alt="NFT"
            width={350}
            height={350}
            className="rounded-md"
          />
        </div>
        <div className="mt-4 flex flex-col justify-center space-y-2">
          <CardInfo title="NFT: " data={nftContract} />
          <CardInfo title="Seller: " data={seller} />
          <CardInfo title="Price: " data={Number(price).toString()} />
          <CardInfo title="ListedAt: " data={formatDate} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={!canBuy} onClick={handleBuy} className="w-full">
          Buy
        </Button>
      </CardFooter>
    </Card>
  )
}
