import { Abi } from "abitype";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";

const useWriteMyContract = ({
  contractAddress,
  abi,
  functionName,
}: {
  contractAddress: string;
  abi: Abi;
  functionName: string;
}) => {
  const { data: result, writeContractAsync } = useWriteContract();
  const writeTxn = useTransactor();
  const handleWrite = async (args: any[]) => {
    if (writeContractAsync) {
      try {
        const makeWriteWithParams = () =>
          writeContractAsync({
            address: contractAddress,
            functionName,
            abi: abi,
            args,
          });
        await writeTxn(makeWriteWithParams);
      } catch (e: any) {
        console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
      }
    }
  };

  const { data: txResult } = useWaitForTransactionReceipt({
    hash: result,
  });

  return [handleWrite, txResult];
};

export default useWriteMyContract;
