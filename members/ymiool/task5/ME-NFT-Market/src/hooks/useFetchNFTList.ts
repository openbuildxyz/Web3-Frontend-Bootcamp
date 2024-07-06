import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { marketContractAbi, marketContractAddress } from "../config/market-contract";
import { INFTItem } from "../model/data";

export function useFetchNFTList(): {
    nftItems: INFTItem[];
    isListFetching: boolean;
    delayRefresh: () => void;
} {
    const [nftItems, setNftItems] = useState<INFTItem[]>([]);

    const { data: nftList, refetch: refetchList, isFetching: isListFetching } = useReadContract(
        {
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'getAllNFTItems'
        }
    );

    async function delayRefresh() {
        setTimeout(() => {
            refetchList();
        }, 2000)
    }
    
    useEffect(() => {
        if (nftList) {
            const activeNFTItems = (nftList as INFTItem[]).filter((item: INFTItem) => item.isActive);
            setNftItems(nftList as INFTItem[]);
        }
    }, [nftList]);

    return {
        nftItems, isListFetching, delayRefresh
    }
}