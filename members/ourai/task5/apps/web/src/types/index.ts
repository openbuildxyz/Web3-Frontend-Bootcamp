type AddressHash = string;

type NftItem = {
  seller: AddressHash;
  nftContract: AddressHash;
  tokenId: number;
  tokenUrl: string;
  price: bigint;
  listedAt: bigint;
  listing: boolean;
}

export type { AddressHash, NftItem }
