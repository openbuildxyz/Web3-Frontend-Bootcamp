import React from 'react';
import { paymentTokenDecimal } from "../config/payment-token-contract";
import NFTItem from './NFTItem';
import { INFTItem } from '../model/app';
import styled from 'styled-components';

interface NFTListProps {
    nftItems: INFTItem[];
    onBuy: (item: INFTItem) => void;
    onRemove: (item: INFTItem) => void;
}

const NFTList: React.FC<NFTListProps> = ({ nftItems, onBuy, onRemove }: NFTListProps) => {
    return (
        <List>
            {[...nftItems].map((item: INFTItem, index: number) =>
                <NFTItem key={index} item={item} priceDecimal={paymentTokenDecimal}
                    onBuy={onBuy} onRemove={onRemove}
                ></NFTItem>
            )}
        </List>
    );
};

export default NFTList;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
`;