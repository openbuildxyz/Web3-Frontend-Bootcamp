'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, message } from "antd";
import {config, SEPOLIA_ALCHMY_KEY, NFT_ADDRESS, TOKEN_ADDRESS, MARKET_ADDRESS} from "./config"
import { Address, NFTCard, Connector, ConnectButton, useAccount} from "@ant-design/web3";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Sepolia, Mainnet } from "@ant-design/web3-wagmi";
import { erc20Abi, erc721Abi } from 'viem';
import { TOKEN_ABI, NFT_ABI } from './abi';

const MyHeader=()=>{
    const { account } = useAccount();
    let balance = "loading..";
    let allow = "loading..";
    if(account){
        const {status, data} = useReadContract({
            abi: TOKEN_ABI,
            address: TOKEN_ADDRESS,
            functionName: 'balanceOf',
            args: [account.address],
            // account: account,
        });
        if("success"===status&&data){
            balance=data.toString();
        }
        const result2 = useReadContract({
            abi: TOKEN_ABI,
            address: TOKEN_ADDRESS,
            functionName: 'allowance',
            args: [account.address, MARKET_ADDRESS],
            // account: account,
        });
        if("success"===result2.status){
            allow=(result2.data as number).toString();
        }
    }
    return (
        <>
            <Connector>
                <ConnectButton />
            </Connector>
        </>
      );
}

export default MyHeader;