import React, { useEffect, useState } from 'react';
import { marketContractAbi, marketContractAddress } from '../config/market-contract';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { INFTItem } from '../model/app';
import Header from '../components/Header';
import Menu from '../components/Menu';
import NFTList from '../components/NFTList';
import styled from 'styled-components';

const Home: React.FC = () => {
    const [nftItems, setNftItems] = useState<INFTItem[]>([]);

    const { data, dataUpdatedAt, refetch: refetchList, isFetching: isListFetching } = useReadContract(
        {
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'getAllNFTItems'
        }
    );

    function delayRefresh() {
        console.log("delay");
        setTimeout(() => {
            refetchList();
            console.log("refreshed");
        }, 2000)
    }

    useEffect(() => {
        console.log(data);
        console.log(new Date(dataUpdatedAt));
        if (data) {
            const activeNFTItems = (data as INFTItem[]).filter((item: INFTItem) => item.isActive);
            setNftItems(data);
        }
    }, [dataUpdatedAt]);

    const { data: buyHash, writeContract: writeContractBuy } = useWriteContract();
    const onBuy = (item: INFTItem) => {
        writeContractBuy({
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'exchangeNFT',
            args: [item.nftContract, item.tokenId],
        }, {
            onSuccess: () => {
                delayRefresh();
            }
        });
    }
    const { isLoading: isBuyConfirming, isSuccess: isBuyConfirmed } =
        useWaitForTransactionReceipt({
            hash: buyHash
        })

    const { data: removeHash, writeContract: writeContractRemove } = useWriteContract();
    const onRemove = (item: INFTItem) => {
        writeContractRemove({
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'inactivateNFT',
            args: [item.nftContract, item.tokenId]
        }, {
            onSuccess: () => {
                delayRefresh();
                console.log('remove success');
            }
        }
        );
    }
    const { isLoading: isRemoveConfirming, isSuccess: isRemoveConfirmed } =
        useWaitForTransactionReceipt({
            hash: removeHash
        })

    return (
        <>
            <Header></Header>
            <Menu onRefresh={delayRefresh}></Menu>
            <NFTList nftItems={nftItems}
                onBuy={onBuy}
                onRemove={onRemove}
            ></NFTList>
            {(isBuyConfirming || isRemoveConfirming || isListFetching) &&
                <LoadingOverlay>Loading...</LoadingOverlay>}
        </>
    );
};

export default Home;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #745ec2;
    z-index: 9999;

    &::after {
        content: '⏳';
        animation: spin 2s infinite linear;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

