import React, { useState } from 'react';
import styled from 'styled-components';
import { nftContractAddress } from '../config/nft-contract';

interface NFTAddingDialogProps {
    onAdd: (nftContract: string, tokenId: string, price: string, onEnd: () => void) => void;
}

const NFTAddingDialog: React.FC<NFTAddingDialogProps> = ({ onAdd }: NFTAddingDialogProps) => {
    const [showDialog, setShowDialog] = useState(false);

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nftContract = formData.get('nftContract') as string;
        const tokenId = formData.get('tokenId') as string;
        const price = formData.get('price') as string;
        onAdd(nftContract, tokenId, price, () => { setShowDialog(false) });
    }

    return (
        <>
            <FloatButton onClick={() => { setShowDialog(!showDialog) }}><BtnText>➕</BtnText></FloatButton>

            {showDialog &&
                <Dialog>
                    <DialogHeader>
                        <CloseBtn onClick={() => { setShowDialog(false) }}>✖</CloseBtn>
                    </DialogHeader>

                    <Form onSubmit={handleOnSubmit}>
                        <Input name="nftContract" placeholder="NFT Contract" required defaultValue={nftContractAddress}></Input>
                        <Input name="tokenId" placeholder="NFT TokenID" required></Input>
                        <Input name="price" placeholder="NFT Price" required></Input>
                        <button type="submit">上架 📣</button>
                    </Form>
                </Dialog>
            }
        </>
    );
};

export default NFTAddingDialog;

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

const Dialog = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1000;
    width: 200px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 300px 160px rgb(102 100 214 / 30%);
    border: 4px solid #f2eeda;

    animation: fadeIn 0.5s forwards;
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const DialogHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
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

const CloseBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    padding: 0px;
`