import { BaseError } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { StatusCallback } from ".";
import { marketContractAbi, marketContractAddress } from "../config/market-contract";
import { INFTItem } from "../model/data";

export function useRemoveNFTFromMarket(): {
    isRemoveConfirming: boolean;
    removeNFTFromMarket: (item: INFTItem, statusCallback: StatusCallback) => void;
} {
    const { data: removeHash, writeContract: writeContractRemove } = useWriteContract();

    const { isLoading: isRemoveConfirming } =
        useWaitForTransactionReceipt({ hash: removeHash })

    const removeNFTFromMarket = (item: INFTItem, statusCallback: StatusCallback) => {
        writeContractRemove({
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'inactivateNFT',
            args: [item.nftContract, item.tokenId]
        }, {
            onSuccess: () => {
                statusCallback.onSuccess?.();
            },
            onError: (error) => {
                alert((error as BaseError)?.shortMessage || error?.message);
            }
        }
        );
    }

    return {
        isRemoveConfirming, removeNFTFromMarket
    }
}