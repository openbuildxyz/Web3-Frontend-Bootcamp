import React, { useState, useEffect } from 'react';
import { INFTItem } from '../model/data';
import { formatUnits } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';
import { nftAbi } from '../config/nft-contract';
import styled from 'styled-components';

function formatAddress(address: string): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface NFTItemCardProps {
    item: INFTItem;
    priceDecimal: number;
    onBuy: (item: INFTItem) => void;
    onRemove: (item: INFTItem) => void;
}

const NFTItemCard: React.FC<NFTItemCardProps> = ({ item, priceDecimal, onBuy, onRemove }: NFTItemCardProps) => {
    const { address } = useAccount();

    const [tokenURI, setTokenURI] = useState<string>();
    const [owner, setOwner] = useState<string>('');

    const { data } = useReadContracts(
        {
            contracts: [{
                abi: nftAbi,
                address: item.nftContract as `0x${string}`,
                functionName: 'tokenURI',
                args: [item.tokenId]
            }, {
                abi: nftAbi,
                address: item.nftContract as `0x${string}`,
                functionName: 'ownerOf',
                args: [item.tokenId]
            }]
        });
    useEffect(() => {
        if (data) {
            setTokenURI(data[0].result as string);
            setOwner(data[1].result as string);
        }
    }, [data])

    return (
        <NFTCard>
            <NFTImg src={tokenURI} />
            <InfoLine>
                <InfoItem>
                    <span>NFT Contract</span>
                    <span title={item.nftContract}>{formatAddress(item.nftContract)}</span>
                </InfoItem>
                <InfoItem>
                    <span>Token ID</span>
                    <span># {item.tokenId.toString()}</span>
                </InfoItem>
            </InfoLine>
            <InfoLine>
                <InfoItem>
                    <span>{item.isActive ? 'Seller' : 'Owner'}</span>
                    <span title={item.seller}>{formatAddress(owner)}</span>
                </InfoItem>
                <InfoItem>
                    <span>Add Time</span>
                    <span>{new Date(Number(item.addTime) * 1000).toLocaleDateString()}</span>
                </InfoItem>
            </InfoLine>
            <InfoLine>
                {item.isActive === false && <ActionBtn disabled>已下架🤍</ActionBtn>}

                {item.isActive === true && (address === item.seller ?
                    <ActionBtn $color={'#4aa3e7'} onClick={() => { onRemove(item) }}>下架⬇️</ActionBtn> :

                    <ActionBtn $color={'red'} onClick={() => { onBuy(item) }
                    }>购买🉐</ActionBtn>)}

                <span style={{ display: 'flex' }}>Price💲<Price>{formatUnits(item.price, priceDecimal)}</Price></span>
            </InfoLine>
        </NFTCard >
    );
};

export default NFTItemCard;

const NFTCard = styled.div`
    border: 1px solid #cfcef0;
    border-radius: 6px;
    padding: 20px;
    margin: 20px;
    width: 200px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 2px 3px rgb(102 100 214 / 30%);
`;

const NFTImg = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
    cursor: grab;
    
    &:hover {
        transform: scale(1.1);
        transition: all 0.3s;
    }
`;

const InfoLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    &:not(:last-child) {
        gap: 50px;
        padding: 0 4px;
    }

    &:last-child {
        font-size: 14px;
        padding-top: 16px;
        border-top: 3px dotted #cfcef0;
        flex-direction: row-reverse;
    }
`;

const InfoItem = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;

    span:first-child {
        color: #b3b3b3;
    }
`

const ActionBtn = styled.button<{ $color?: string }>`
    flex-shrink: 0;
    border: 1px solid ${props => props.$color || 'none'};
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
    padding: 8px 10px;
`;

const Price = styled.span`
    font-size: 16px;
    font-weight: bold;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin-right: 2px;
`;