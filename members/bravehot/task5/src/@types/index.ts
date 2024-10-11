export interface NFTInter {
  seller: string;
  nftContract: string;
  tokenId: string | number;
  price: string | number;
  isActive: boolean;
  listTime: string | number;
  isList: boolean;
}
