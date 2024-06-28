'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, message } from "antd";
import {config, SEPOLIA_ALCHMY_KEY, NFT_ADDRESS, TOKEN_ADDRESS, MARKET_ADDRESS} from "./config"
import { Address, NFTCard, Connector, ConnectButton, useAccount } from "@ant-design/web3";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Sepolia, Mainnet } from "@ant-design/web3-wagmi";
import { erc20Abi, erc721Abi } from 'viem'
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import MyHeader from './header';
import NftList from './NFTList'

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <WagmiWeb3ConfigProvider config={config} wallets={[MetaMask(), OkxWallet()]} eip6963={{autoAddInjectedWallets: true,}} chains={[Sepolia]}>
        <NftList />
      </WagmiWeb3ConfigProvider>
    </main>
  );
}
