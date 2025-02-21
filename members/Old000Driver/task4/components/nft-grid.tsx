"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NFT {
  id: string
  name: string
  contractAddress: string
  tokenId: string
  price: string
  seller: string
}

// This is mock data. In a real application, you would fetch this data from your backend or blockchain
const mockNFTs: NFT[] = [
  { id: "1", name: "Cool Cat #1", contractAddress: "0x123...abc", tokenId: "1", price: "100", seller: "0xabc...123" },
  {
    id: "2",
    name: "Bored Ape #42",
    contractAddress: "0x456...def",
    tokenId: "42",
    price: "200",
    seller: "0xdef...456",
  },
  {
    id: "3",
    name: "Crypto Punk #888",
    contractAddress: "0x789...ghi",
    tokenId: "888",
    price: "150",
    seller: "0xghi...789",
  },
  { id: "4", name: "Doodle #007", contractAddress: "0xabc...123", tokenId: "7", price: "80", seller: "0x123...abc" },
  { id: "5", name: "Azuki #555", contractAddress: "0xdef...456", tokenId: "555", price: "120", seller: "0x456...def" },
  {
    id: "6",
    name: "World of Women #303",
    contractAddress: "0xghi...789",
    tokenId: "303",
    price: "90",
    seller: "0x789...ghi",
  },
]

export function NFTGrid() {
  const [nfts] = useState<NFT[]>(mockNFTs)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nfts.map((nft) => (
        <Card key={nft.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{nft.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-1">Contract: {nft.contractAddress}</p>
            <p className="text-sm text-muted-foreground mb-1">Token ID: {nft.tokenId}</p>
            <p className="text-sm font-medium mb-1">Price: {nft.price} ERC20</p>
            <p className="text-sm text-muted-foreground">Seller: {nft.seller}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => console.log("Buy NFT:", nft.id)}>
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

