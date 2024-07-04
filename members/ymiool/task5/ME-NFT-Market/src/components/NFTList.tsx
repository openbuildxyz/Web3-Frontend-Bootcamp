import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { marketContractAbi, marketContractAddress, marketPaymentTokenDecimal } from '../config/market-contract';
import NFTItem from './NFTItem';
import { INFTItem } from '../App';
import styled from 'styled-components';

const NFTList: React.FC = () => {
    const [nftItems, setNftItems] = useState<INFTItem[]>([]);

    const { data } = useReadContract(
        {
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'getAllNFTItems'
        }
    );
    useEffect(() => {
        if (data) {
            setNftItems(data as INFTItem[]);
        }
    }, [data])

    return (
        <List>
            {[...nftItems].map((item: INFTItem, index: number) =>
                <NFTItem key={index} item={item} priceDecimal={marketPaymentTokenDecimal}></NFTItem>
            )}
        </List>
    );
};

export default NFTList;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
`;