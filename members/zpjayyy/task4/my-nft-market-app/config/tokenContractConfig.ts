import {sepolia} from "wagmi/chains";
import {tokenAbi} from "@/abi/TokenAbi";

export const tokenContractConfig = {
  chainId: sepolia.id,
  abi: tokenAbi,
  address: "0x24d69aBA97DdDCEf0c58655Da820B5F2deED2A0c"
} as const;