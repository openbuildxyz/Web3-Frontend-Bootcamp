import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { marketContractAbi, marketContractAddress } from '../config/market-contract';

const NFTList: React.FC = () => {
    const { address } = useAccount();

    const { data } = useReadContract(
        {
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'getAllNFTItems'
        }
    );

    return (
        <>
        </>
    );
};

export default NFTList;