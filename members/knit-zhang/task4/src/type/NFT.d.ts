export interface NFT {
  collectionAddress: string;
  tokenId: number;
  owner: `0x${string}`;
  price: bigint;
  selling: boolean;
}

type abi =
  | `function${string}`
  | `event${string}`
  | `fallback${string}`
  | `receive${string}`
  | `constructor${string}`
  | `modifier${string}`
  | `error${string}`;
export interface Contract {
  address: `0x${string}`;
  abi: abi[];
}
