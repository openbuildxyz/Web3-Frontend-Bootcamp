export interface ListNFTCardProps {
  buyer: string;
  isSold: boolean;
  nftContract: string;
  paymentToken: string;
  price: number;
  seller: string;
  soldTimestamp: number;
  timestamp: number;
  tokenId: number;
  tokenURI: string;
}
