export interface NFT {
  id: number;
  nftContract: string;
  tokenId: bigint;
  seller: string;
  price: bigint;
  url: string;
  listingTime: bigint;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

export interface DisplayNFTsProps {
  id: number;
  nftContract: string;
  tokenId: bigint;
  seller: string;
  price: bigint;
  url: string;
  listingTime: bigint;
  name: string;
  description: string;
  image: string;
}
