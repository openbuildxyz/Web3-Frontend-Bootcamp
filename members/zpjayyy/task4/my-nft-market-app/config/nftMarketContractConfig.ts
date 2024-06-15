import {sepolia} from "wagmi/chains";
import {nftMarketAbi} from "@/abi/NftMarketAbi";

export const nftMarketContractConfig = {
  chainId: sepolia.id,
  abi: nftMarketAbi,
  address: "0x3261150cE2beEe2F6B68712F588FEd47B947D9A7"
} as const;