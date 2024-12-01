export interface INFTITem {
  seller: `0x${string}`;
  nftContract: `0x${string}`;
  tokenId: bigint;
  price: bigint;
  isActive: boolean;
}
