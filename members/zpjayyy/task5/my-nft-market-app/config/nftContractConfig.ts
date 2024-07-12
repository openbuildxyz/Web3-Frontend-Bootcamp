import {sepolia} from "wagmi/chains";
import {nftAbi} from "@/abi/NftAbi";

export const nftContractConfig = {
  chainId: sepolia.id,
  abi: nftAbi,
  address: "0x452BFD557b3a4Fc39ACB4bbdC0314720012B3395"
} as const;