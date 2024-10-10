export interface NFTMarketToken {
  seller: string;
  nftContract: string;
  tokenId: number;
  price: bigint;
  sold: boolean;
  listingId: number;
}

export interface NFTTokenMetadata {
  name: string;
  image: string;
  description: string;
}

export type NFTMarketTokenDetailedInfo = NFTMarketToken & NFTTokenMetadata;
