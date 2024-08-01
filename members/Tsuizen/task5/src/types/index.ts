export interface NFTItem {
  price: bigint;
  tokenId: number;
  nftContract: string;
  isActive: boolean;
  tokenUrl: string;
  seller: string;
  listedAt: number;
}