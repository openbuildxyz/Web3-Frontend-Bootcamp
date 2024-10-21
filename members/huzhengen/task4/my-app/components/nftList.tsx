import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useReadContract, useToken, useWriteContract } from 'wagmi';
import { formatEther, Address } from 'viem'
import { allenTokenABI } from '../abis/allenTokenABI'
import { allenNFTExchangeABI } from '../abis/allenNFTExchangeABI';
import { mainnet, sepolia } from 'wagmi/chains'
import { useState } from 'react';
import { contractAddress } from '../utils/contractAddress'
import { allenNFTABI } from '../abis/allenNFTABI';

const NftList: NextPage = () => {
  const { writeContract } = useWriteContract()

  const result = useReadContract({
    abi: allenNFTExchangeABI,
    address: contractAddress.marketAddress as Address,
    functionName: 'getAllNFTs',
    args: [],
  })

  const buyNFT = (nftAddress: Address, tokenId: bigint) => {
    const result = writeContract({
      abi: allenNFTExchangeABI,
      address: contractAddress.marketAddress as Address,
      functionName: 'buyNFT',
      args: [nftAddress, tokenId],
    })
  }

  return (
    <div>
      <h3>NFT 列表</h3>
      {result.data?.map(item => (
        <div key={item.tokenId}>
          <h5>token id：{Number(item.tokenId)}</h5>
          <span>NFT 合约地址：{item.nftContract}</span><br></br>
          <span>卖家地址：{item.seller}</span><br></br>
          <span>价格：{Number(item.price)}</span><br></br>
          <button onClick={() => buyNFT(item.nftContract, item.tokenId)}>购买</button>
        </div>
      ))}
    </div>
  );
};

export default NftList;
