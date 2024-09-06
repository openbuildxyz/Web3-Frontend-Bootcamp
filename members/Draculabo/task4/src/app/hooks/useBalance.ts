import OpenBuildToken from "@/abis/OpenBuildToken";
import { OPENBUILDTOKEN_ADDR } from "@/abis/address";
import {  useReadContract } from "wagmi";

const useBalance = ({address}: {
  address: `0x${string}`
}) => {

  return  useReadContract({
    address: OPENBUILDTOKEN_ADDR,
    abi: OpenBuildToken,
    functionName: "balanceOf",
    args: [address!],
  }).data || BigInt(0);
}

export {
  useBalance
}
