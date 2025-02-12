export interface NFT {
  id: string
  name: string
  description: string
  image: string
  contractAddress: string
  tokenId: string
  price: number
  seller: string
  isListed: boolean
}

export const nfts: NFT[] = [
  {
    id: "1",
    name: "Cosmic Voyager",
    description: "A journey through the stars",
    image: "/placeholder.svg?height=300&width=300",
    contractAddress: "0x1234567890123456789012345678901234567890",
    tokenId: "1",
    price: 0.5,
    seller: "0x1234...5678",
    isListed: false,
  },
  {
    id: "2",
    name: "Digital Dreamscape",
    description: "A surreal digital landscape",
    image: "/placeholder.svg?height=300&width=300",
    contractAddress: "0x1234567890123456789012345678901234567890",
    tokenId: "2",
    price: 0.7,
    seller: "0x8765...4321",
    isListed: false,
  },
  {
    id: "3",
    name: "Neon Nights",
    description: "A vibrant cityscape in neon",
    image: "/placeholder.svg?height=300&width=300",
    contractAddress: "0x1234567890123456789012345678901234567890",
    tokenId: "3",
    price: 0.3,
    seller: "0x2468...1357",
    isListed: false,
  },
]

