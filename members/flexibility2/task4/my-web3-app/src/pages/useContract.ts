import { ethers } from "ethers";
import { useWriteContract } from "wagmi";
import { ABI } from "./abi";

const contractAddress = "0xFAB77D25DcfA32257bE59be3875dC86A0F2F743a";
const contractABI = ABI;

export const useMyContract = writeContract({
  address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  abi,
  functionName: "mint",
  args: [BigInt(tokenId)],
});
