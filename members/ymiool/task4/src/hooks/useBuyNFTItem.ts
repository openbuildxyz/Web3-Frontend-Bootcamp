import { BaseError } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { marketContractAbi, marketContractAddress } from "../config/market-contract";
import { INFTItem } from "../model/data";
import { StatusCallback } from ".";

export function useBuyNFTItem(): {
    isBuyConfirming: boolean;
    buyNFTItem: (item: INFTItem, statusCallback: StatusCallback) => void;
} {
    const { data: buyHash, writeContract: writeContractBuy } = useWriteContract();

    const { isLoading: isBuyConfirming } =
        useWaitForTransactionReceipt({ hash: buyHash });

    const buyNFTItem = (item: INFTItem, statusCallback: StatusCallback) => {
        const { onSuccess } = statusCallback;
        
        writeContractBuy({
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'exchangeNFT',
            args: [item.nftContract, item.tokenId],
        }, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (error) => {
                alert((error as BaseError)?.shortMessage || error?.message);
            }
        });
    }

    return {
        isBuyConfirming, buyNFTItem
    }
}
