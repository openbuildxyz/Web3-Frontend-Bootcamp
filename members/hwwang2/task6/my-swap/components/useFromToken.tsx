import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'
import { formatUnits, parseUnits } from 'viem'
import { config } from './config';
import { message } from "antd";
// getContract from wagmi/actions

import { erc20Abi, Address } from 'viem';

const DECIMALS = 18;

const useFromToken = (fromTokenAddress: string) => {
  const account = useAccount();
  const { status, data: hash1, writeContract, writeContractAsync } = useWriteContract();

  const approve = async (address: string, amount: string|number, decimals?: number) => {
    let dec = decimals || DECIMALS
    const parsedAmount = parseUnits(amount.toString(), dec);
    const d1 = await writeContractAsync({
      abi: erc20Abi,
      address: fromTokenAddress as Address,
      functionName: "approve",
      args: [address as Address, parsedAmount],
    },
    {
        onSuccess: (data) => {
          message.success("授权成功！");
        },
        onError: (err) => {
            message.error(err.message);
        },
    });
  
    console.log(d1);
    let transactionReceipt = await waitForTransactionReceipt(config, {
      hash: d1,
      pollingInterval: 1_000, 
    });

    return transactionReceipt;
  };

  return { approve };
};

export default useFromToken;
