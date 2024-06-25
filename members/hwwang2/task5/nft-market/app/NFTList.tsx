'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { Button, message,Form, Input, Modal, Radio } from "antd";
import {config, SEPOLIA_ALCHMY_KEY, NFT_ADDRESS, TOKEN_ADDRESS, MARKET_ADDRESS} from "./config"
import { Address, NFTCard, Connector, ConnectButton, useAccount } from "@ant-design/web3";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Sepolia, Mainnet } from "@ant-design/web3-wagmi";
import { erc20Abi, erc721Abi, parseUnits, formatUnits } from 'viem'
import { Network, Alchemy, OwnedNft, BigNumber } from "alchemy-sdk";
import { MARKET_ABI, TOKEN_ABI } from './abi';
import { SellNftForm } from './NFTSell';
import { waitForTransactionReceipt } from '@wagmi/core'
import { Col, Row, Flex } from 'antd';

import styles from "./page.module.css";

const NftList = function({
    // owner,
    // toggle,
    }: {
    // owner: string;
    // toggle: () => void;
    }){
    const [open, setOpen] = useState(false);
    const [op, setOp] = useState(0);
    const { status, data: hash1, writeContract, writeContractAsync } = useWriteContract();

    const onCreate = async (values: any) => {
      setOpen(false);
      const d1 = await writeContractAsync({
          abi: erc721Abi,
          address: values.addr,
          functionName: "approve",
          args: [MARKET_ADDRESS, values.id],
      },
      {
          onSuccess: (data) => {
            message.success("授权成功！");
          },
          onError: (err) => {
              message.error(err.message);
          },
      });
      
      console.log(d1);
      let transactionReceipt = await waitForTransactionReceipt(config, {
        hash: d1,
        pollingInterval: 1_000, 
      });
      console.log(transactionReceipt);
      const d2 = await writeContractAsync({
          abi: MARKET_ABI,
          address: MARKET_ADDRESS,
          functionName: "listItem",
          args: [values.addr, values.id, parseUnits(values.price,6)],
      },{
        onSuccess: () => {
          message.success("上架成功！");
        },
        onError: (err) => {
            message.error(err.message);
        },
      });
      console.log(d2);
      transactionReceipt = await waitForTransactionReceipt(config, {
        hash: d2,
        pollingInterval: 500, 
      });
      console.log(transactionReceipt);
      setOp(op+1);
    };

    const purchase=async function(address:string, tokenId: number, price: number){
        const d1 = await writeContractAsync({
            abi: TOKEN_ABI,
            address: TOKEN_ADDRESS,
            functionName: "approve",
            args: [MARKET_ADDRESS, price],
        },{
          onSuccess: () => {
            message.success("授权成功！");
          },
          onError: (err) => {
              message.error(err.message);
          },
        });
        console.log(d1);
        let transactionReceipt = await waitForTransactionReceipt(config, {
          hash: d1,
          pollingInterval: 1_000, 
        });
        console.log(transactionReceipt);
        const d2 = await writeContractAsync({
          abi: MARKET_ABI,
          address: MARKET_ADDRESS,
          functionName: "purchase",
          args: [address,tokenId],
        },{
          onSuccess: () => {
            message.success("购买成功！");
          },
          onError: (err) => {
              message.error(err.message);
          },
        });
        console.log(d2);
        transactionReceipt = await waitForTransactionReceipt(config, {
          hash: d2,
          pollingInterval: 500, 
        });
        console.log(transactionReceipt);
        setOp(op+1);
        return;
    }

    const [nfts, setNfts] = useState<OwnedNft[]>([]);
    useEffect(function(){
        const settings = {
        apiKey: SEPOLIA_ALCHMY_KEY, // Replace with your Alchemy API Key.
        network: Network.ETH_SEPOLIA, // Replace with your network.
        };
        
        const alchemy = new Alchemy(settings);
        alchemy.nft.getNftsForOwner(MARKET_ADDRESS).then((res)=>{
        // console.log(res.ownedNfts);s
        setNfts(res.ownedNfts);
        });
    }, [op]);
    return (
        <>
        <Flex justify="space-between" style={{width:"100%", margin:"1rem"}}>
          <Connector>
              <ConnectButton />
          </Connector>
          <Button
              type="primary"
              onClick={() => {
              setOpen(true);
              }}
          >
              卖出NFT
          </Button>
        </Flex>
        <SellNftForm
            open={open}
            onCreate={onCreate}
            onCancel={() => {
            setOpen(false);
            }}
        />
        <Flex justify="space-between" style={{width:"100%"}} wrap>
        {
            nfts.map(item=>(<NftItem key={item.contract.address+"_"+item.tokenId} address={item.contract.address} tokenId={(Number)(item.tokenId)} img={item.image.originalUrl} purchase={purchase}/>))
        }
        </Flex>
        </>
    );
}

const NftItem= function({
    address,
    tokenId,
    img,
    purchase,
    }: {
        address: string;
        tokenId: number;
        img: string|undefined,
        purchase: (address:string, tokenId: number, price: number) => void;
    }){
    let _owner = "";
    let _price = 0;
    let _ts = 0;
    const { account } = useAccount();
    const infoResult = useReadContract({
        abi: MARKET_ABI,
        address: MARKET_ADDRESS,
        functionName: 'getNftSellInfo',
        args: [address, tokenId],
        // account: account,
    });
    
    if(infoResult.status==="success"){
        const {owner, price, ts} = infoResult.data as {owner:string, price:number, ts: number};
        _owner = owner;
        _price = price;
        _ts = ts;
    }
    
    return (
        <div className={styles.nftItem} >
            <img src={img}/>
            {/* <NFTCard address={address} tokenId={tokenId} /> */}
            <div className={styles.nftItemDesc}>Seller:{_owner}</div>
            <div className={styles.nftItemDesc}>NFTAddr:{address}</div>
            <div className={styles.nftItemDesc}>NFT ID:{tokenId}</div>
            <div className={styles.nftItemDesc}>上架时间:{_ts}</div>
            
            <span>售价:{_price==0?"":formatUnits(BigInt(_price), 6)}</span>
            {_owner && (account?.address!=_owner) && <Button onClick={() =>{purchase(address, tokenId,_price);}}>购买</Button>}
        </div>
    );
}

export default NftList;
