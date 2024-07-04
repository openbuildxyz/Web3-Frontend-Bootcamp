import React, { useState, useEffect } from 'react';
import { INFTItem } from '../App';
import { formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { NFTAbi } from '../config/nft-contract';
import styled from 'styled-components';

function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface NFTItemProps {
    item: INFTItem;
    priceDecimal: number;
}

const NFTItem: React.FC<NFTItemProps> = ({ item, priceDecimal }: NFTItemProps) => {
    const { address } = useAccount();

    const [tokenURI, setTokenURI] = useState<string>();

    const { data } = useReadContract(
        {
            abi: NFTAbi,
            address: item.nftContract as `0x${string}`,
            functionName: 'tokenURI',
            args: [item.tokenId]
        }
    );
    useEffect(() => {
        if (data) {
            setTokenURI(data as string);
        }
    }, [data])

    return (
        <NFTCard>
            <NFTImg src={tokenURI} />
            <InfoLine>
                <InfoItem>
                    <span>NFT Contract</span>
                    <span>{formatAddress(item.nftContract)}</span>
                </InfoItem>
                <InfoItem>
                    <span>Token ID</span>
                    <span>{item.tokenId.toString()}</span>
                </InfoItem>
            </InfoLine>
            <InfoLine>
                <InfoItem>
                    <span>Seller</span>
                    <span>{formatAddress(item.seller)}</span>
                </InfoItem>
                <InfoItem>
                    <span>Add Time</span>
                    <span>{new Date(Number(item.addTime) * 1000).toLocaleDateString()}</span>
                </InfoItem>
            </InfoLine>
            <InfoLine>
                <span>Price💲{formatUnits(item.price, priceDecimal)}</span>
                {address === item.seller ? <span>下架⬇️</span> : <span>购买🉐</span>}
            </InfoLine>
        </NFTCard>
    );
};

export default NFTItem;

const NFTCard = styled.div`
    border: 1px solid #e9ecef;
    padding: 20px;
    margin: 20px;
    width: 200px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const NFTImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`;

const InfoLine = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const InfoItem = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    font-size: 12px;
`