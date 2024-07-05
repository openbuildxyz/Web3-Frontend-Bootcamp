import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { marketContractAbi, marketContractAddress } from '../config/market-contract';
import { paymentTokenContractAbi, paymentTokenContractAddress, paymentTokenDecimal } from "../config/payment-token-contract";
import { nftAbi, nftContractAddress } from '../config/nft-contract';

interface MenuProps {
    onRefresh: any;
}

const Menu: React.FC = ({ onRefresh }: MenuProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const { data: addHash, isPending: isAddPending, error, writeContract: contractAddNFT } = useWriteContract();
    const { data: approveNFTHash, writeContract: contractApproveNFT } = useWriteContract();
    const { data: approveTokenHash, writeContract: contractApproveToken } = useWriteContract();

    const { isLoading: isAddLoading, isSuccess: isAddSuccess } = useWaitForTransactionReceipt({
        hash: addHash
    });

    async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nftContract = formData.get('nftContract') as string;
        const tokenId = formData.get('tokenId') as string;
        const price = formData.get('price') as string;
        contractAddNFT({
            abi: marketContractAbi,
            address: marketContractAddress,
            functionName: 'addNFT',
            args: [nftContract, BigInt(tokenId), BigInt(Number(price) * Math.pow(10, paymentTokenDecimal))]
        }, {
            onSettled: () => {
                setShowDialog(false);
            },
            onError: () => {
                alert((error as BaseError).shortMessage || error?.message);
            },
            onSuccess: () => {
                onRefresh();
                console.log('add success');
            }
        }
        );
    }

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
        <>
            <FloatButton onClick={() => { setShowDialog(!showDialog) }}><BtnText>➕</BtnText></FloatButton>
            {showDialog &&
                <Dialog $showDialog={showDialog}>
                    <Header>
                        <button onClick={() => { setShowDialog(false) }}>❎</button>
                    </Header>
                    <button onClick={handleOnAuthorize}>授权</button>
                    <Form onSubmit={handleOnSubmit}>
                        <Input name="nftContract" placeholder="NFT Contract" required defaultValue={nftContractAddress}></Input>
                        <Input name="tokenId" placeholder="NFT TokenID" required></Input>
                        <Input name="price" placeholder="NFT Price" required></Input>
                        <button type="submit" disabled={isAddLoading || isAddPending}>上架</button>
                    </Form>
                </Dialog>
            }
        </>
    );
};

export default Menu;

const FloatButton = styled.button`
    position: fixed;
    right: 20px;
    bottom: 20px;
    border: 3px solid #745ec2;
    box-shadow: 4px 4px 14px rgb(102 100 214 / 50%);
    color: black;
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 40px;
    padding: 0;
    box-sizing: content-box;

    &:hover {
        width: 180px;
        border-color: #f2eeda;
    }

    transition: all 0.3s;
`;

const BtnText = styled.span`
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 60px;

    &:hover {
        &::before {
            content: '上架 NFT ';
        }
`;

const Dialog = styled.div<{ $showDialog: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: min(80vw, 800px);
    height: 70vh;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 300px 200px rgb(102 100 214 / 30%);
    border: 4px solid #f2eeda;

    animation: fadeIn 0.3s forwards;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Header = styled.div`
    height: 10%;
    display: flex;
    justify-content: flex-end;
`;

const Form = styled.form`
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #745ec2;
`;