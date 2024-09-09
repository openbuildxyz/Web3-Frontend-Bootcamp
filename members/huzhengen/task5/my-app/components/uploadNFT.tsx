import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useToken, useWriteContract } from 'wagmi';
import { formatEther, Address } from 'viem'
import { allenTokenAbi } from '../abis/allenTokenAbi'
import { allenNFTExchangeAbi } from '../abis/allenNFTExchangeAbi';
import { mainnet, sepolia } from 'wagmi/chains'
import { useState } from 'react';
import { contractAddress } from '../utils/address';

const UploadNFT: NextPage = () => {
  // const [nftAddress, setNftAddress] = useState('')
  const [nftTokenId, setNftTokenId] = useState('')
  const [nftPrice, setNftPrice] = useState('')
  const [nftTokenUrl, setNftTokenUrl] = useState('')

  const { writeContract } = useWriteContract()

  const handleUploadNFT = () => {
    console.log('upload nft', contractAddress.nftAddress, nftTokenId, nftPrice)
    const result = writeContract({
      address: contractAddress.marketAddress as Address,
      abi: allenNFTExchangeAbi,
      functionName: 'sell',
      args: [contractAddress.nftAddress as Address, BigInt(nftTokenId), BigInt(nftPrice), nftTokenUrl],
    })
    console.log('result', result)
  }

  return (
    <div>
      <h3>上架 NFT（上架自己拥有的的 NFT）</h3>
      Token ID: <input type="text" value={nftTokenId}
        onChange={e => setNftTokenId(e.target.value)} /><br></br>
      价格: <input type="text" value={nftPrice}
        onChange={e => setNftPrice(e.target.value)} /><br></br>
      tokenUrl: <input type="text" value={nftTokenUrl}
        onChange={e => setNftTokenUrl(e.target.value)} /><br></br>
      <button onClick={handleUploadNFT}>上架 NFT</button>
    </div>
  );
};

export default UploadNFT;
