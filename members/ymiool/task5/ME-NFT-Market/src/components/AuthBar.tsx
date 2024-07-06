import React, { useEffect, useState } from 'react';
import { marketContractAddress } from '../config/market-contract';
import { nftAbi, nftContractAddress } from '../config/nft-contract';
import { paymentTokenContractAbi, paymentTokenContractAddress, paymentTokenDecimal } from '../config/payment-token-contract';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import styled from 'styled-components';

const AuthBar: React.FC = () => {
    const { address: userAddress } = useAccount();

    const [isApproved, setIsApproved] = useState<boolean>(false);
    const { data: isApprovedNFT, status, error } = useReadContract({
        abi: nftAbi,
        address: nftContractAddress,
        functionName: 'isApprovedForAll',
        args: [userAddress, marketContractAddress]
    });
    useEffect(() => {
        setIsApproved(isApprovedNFT as boolean);
    }, [status])

    const { data: approveNFTHash, writeContract: contractApproveNFT } = useWriteContract();
    const { data: approveTokenHash, writeContract: contractApproveToken } = useWriteContract();
    async function handleOnAuthorize() {
        contractApproveNFT({
            abi: nftAbi,
            address: nftContractAddress,
            functionName: 'setApprovalForAll',
            args: [marketContractAddress, true]
        });
        contractApproveToken({
            abi: paymentTokenContractAbi,
            address: paymentTokenContractAddress,
            functionName: 'approve',
            args: [marketContractAddress, BigInt(100000 * Math.pow(10, paymentTokenDecimal))]
        });
    }

    return (
        <> {userAddress && !isApproved &&
            <>
                <span>🟡 未授权 👉</span>
                <Btn onClick={handleOnAuthorize}>授权</Btn>
            </>}
        </>
    );
};

export default AuthBar;

const Btn = styled.button`
    background-color: #f0f0f0;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
`;
