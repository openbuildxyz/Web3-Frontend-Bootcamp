import React, { useState, useEffect } from 'react';
import { INFTItem } from '../model/app';
import { formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { nftAbi } from '../config/nft-contract';
import styled from 'styled-components';

function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface NFTItemProps {
    item: INFTItem;
    priceDecimal: number;
    onBuy: (item: INFTItem) => void;
    onRemove: (item: INFTItem) => void;
}

const NFTItem: React.FC<NFTItemProps> = ({ item, priceDecimal, onBuy, onRemove }: NFTItemProps) => {
    const { address } = useAccount();

    const [tokenURI, setTokenURI] = useState<string>();

    const { data } = useReadContract(
        {
            abi: nftAbi,
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
                {item.isActive === false && <span>已下架🤍</span>}
                {item.isActive === true && (address === item.seller ?
                    <span onClick={() => { onRemove(item) }}>下架⬇️</span> :
                    <span onClick={() => { onBuy(item) }
                    }>购买🉐</span>)}
            </InfoLine>
        </NFTCard >
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