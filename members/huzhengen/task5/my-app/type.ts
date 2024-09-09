import { Address } from 'viem';

export interface marketNFT {
  seller: Address
  nftContract: Address
  tokenId: bigint
  tokenUrl: string
  price: bigint
  listedAt: bigint
  listing: boolean
}

// address seller;
// address nftContract;
// uint tokenId;
// string tokenUrl;
// uint256 price;
// uint256 listedAt;
// bool listing;