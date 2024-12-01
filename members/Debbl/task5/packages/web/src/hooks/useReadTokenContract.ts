import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import type { Config, UseReadContractParameters } from "wagmi";
import { useReadContract } from "wagmi";
import type { ResolvedRegister } from "@wagmi/core";
import type { ReadContractData } from "wagmi/query";
import { Contract } from "~/constants";

// function generatorReadContract({
//   abi,
//   address,
// }: {
//   abi: any;
//   address: Address;
// }) {
//   return () => {
//     return useReadContract({
//       abi,
//       address,
//     });
//   };
// }

// const useReadTokenContract = generatorReadContract({
//   abi: Contract.Token.abi,
//   address: Contract.Token.address,
// });

export function useReactTokenContract<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, "pure" | "view">,
  args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  config extends Config = ResolvedRegister["config"],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: Omit<
    UseReadContractParameters<abi, functionName, args, config, selectData>,
    "abi" | "address"
  > = {} as any,
) {
  return useReadContract<abi, functionName, args, config, selectData>({
    ...parameters,
    abi: Contract.Token.abi,
    address: Contract.Token.address,
  } as any);
}
