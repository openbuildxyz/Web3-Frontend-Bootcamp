import {sepolia} from "wagmi/chains";
import {nftMarketAbi} from "@/abi/NftMarketAbi";

export const nftMarketContractConfig = {
  chainId: sepolia.id,
  abi: nftMarketAbi,
  address: "0x0695AeFd80F824b45acc6132CDa0f605b7433437"
} as const;