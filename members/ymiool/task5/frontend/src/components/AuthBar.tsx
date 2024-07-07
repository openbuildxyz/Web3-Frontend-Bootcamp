import React, { useEffect, useState } from 'react';
import { marketContractAddress } from '../config/market-contract';
import { nftAbi, nftContractAddress } from '../config/nft-contract';
import { paymentTokenContractAbi, paymentTokenContractAddress, paymentTokenDecimal } from '../config/payment-token-contract';
import { BaseError, useAccount, useReadContract, useWriteContract } from 'wagmi';
import styled from 'styled-components';

const AuthBar: React.FC = () => {
    const [isApproved, setIsApproved] = useState<boolean>(false);

    const { address: userAddress } = useAccount();

    const { data: isApprovedNFT, dataUpdatedAt } = useReadContract({
        abi: nftAbi,
        address: nftContractAddress,
        functionName: 'isApprovedForAll',
        args: [userAddress, marketContractAddress]
    });
    useEffect(() => {
        setIsApproved(isApprovedNFT as boolean);
    }, [dataUpdatedAt])

    const [isApproving, setIsApproving] = useState<boolean>(false);
    const { writeContractAsync: contractApproveNFT } = useWriteContract();
    const { writeContractAsync: contractApproveToken } = useWriteContract();
    async function handleOnAuthorize() {
        setIsApproving(true);
        try {
            await Promise.all([
                contractApproveNFT({
                    abi: nftAbi,
                    address: nftContractAddress,
                    functionName: 'setApprovalForAll',
                    args: [marketContractAddress, true]
                }),
                contractApproveToken({
                    abi: paymentTokenContractAbi,
                    address: paymentTokenContractAddress,
                    functionName: 'approve',
                    args: [marketContractAddress, BigInt(100000 * Math.pow(10, paymentTokenDecimal))]
                })
            ]);
            setIsApproved(true);
        } catch (error) {
            alert((error as BaseError)?.shortMessage || (error as BaseError)?.message);
        } finally {
            setIsApproving(false);
        }
    }

    return (
        <> {userAddress && !isApproved &&
            <>
                <span>🟡 未授权 👉</span>
                <Btn onClick={handleOnAuthorize} disabled={isApproving}>授权🗝️</Btn>
            </>}
        </>
    );
};

export default AuthBar;

const Btn = styled.button`
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 4px 6px 6px 10px;
    margin: 5px;
`;
