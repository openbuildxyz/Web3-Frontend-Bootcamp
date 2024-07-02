import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAccount} from "wagmi"
import BuyNFT from './buyNFT';
import ListNFT from './listNFT';
import AllNFT from './allNFT';
import { getNFTContract, getTokenContract, getMarketContract } from "../util/index";
import { useState, useEffect } from 'react';
import Mint from './mint';

const Home: NextPage = () => {
    const account = useAccount()
    const [allNFTList, setAllNFTList] = useState([])
 

    useEffect(() => {
      getAllNFTList()
    }, [])

    const onButtonClick = async ({ addresss, marketAddresss, tokenId, data = "0x" }) => { 
        if (!account.address) {
            window.alert('请连接钱包');
            return;
        }
        try {
            const { contract } = await getNFTContract();

            const res = await contract.ownerOf(0)
            console.log(res);

            const tx = await contract["safeTransferFrom(address,address,uint256,bytes)"](addresss, marketAddresss, tokenId, data);
            // 等待交易完成
            await tx.wait();
            // 打印交易结果
            console.log('Transaction:', tx);
            window.alert('交易成功');
    
        } catch (e) {
            console.log(e);
        }
        getAllNFTList();
    };



    const onBuyClick = async (tokenId) => {
        if(!account.address) {
            window.alert('请连接钱包')
            return
        }
        
        try {
            const {contract: tokenContract} = await getTokenContract()
            
            tokenContract.approve('0x4063F92fCf439a4f88dB2D3F33c644af766FCc40', BigInt("10000000000"))

            const {contract: marketContract} = await getMarketContract()
            await marketContract.buy(tokenId)
        } catch(e) {
            console.log(e);
        }
        getAllNFTList()
    }       


    const getAllNFTList = async ()=> {
        try{
            const {contract: marketContract, signer: marketSigner} = await getMarketContract()
            const list = await marketContract.getAllNFTs()


            const parsedOrders = list.map(order => {
                return {
                    price: order.price.toString(), 
                    seller: order.seller,
                    tokenId: order.tokenId.toString() 
                };
            });
        
            setAllNFTList(parsedOrders)
        } catch(e){

        } 
    }


  return (
    <div className="content">
      <ConnectButton />
      <div className="main">
        <Mint />
        <ListNFT  click={onButtonClick}/>
        <BuyNFT click={onBuyClick} allNFTList={allNFTList} />
      </div>
    
    </div>
   
  );
};

export default Home;
