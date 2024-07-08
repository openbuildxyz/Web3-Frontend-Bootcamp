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
import { allenNFTTokenAbi } from '../abis/allenNFTTokenAbi';

const MintNFT: NextPage = () => {
  const { address } = useAccount()
  const [tokenAmount, setTokenAmount] = useState('')

  const { writeContract } = useWriteContract()

  // 铸造 NFT
  const handleMintNFT = () => {
    console.log('mint', address, contractAddress.nftAddress);

    const result = writeContract({
      address: contractAddress.nftAddress as Address,
      abi: allenNFTTokenAbi,
      functionName: 'mint',
      args: [],
    })

    console.log('mint end', result)
  }

  // 给 NFT 市场授权
  const approvalForAll = () => {
    const result = writeContract({
      address: contractAddress.nftAddress as Address,
      abi: allenNFTTokenAbi,
      functionName: 'setApprovalForAll',
      args: [contractAddress.marketAddress as Address, true],
    })
  }

  // 给市场授权代币的数量
  const approve = () => {
    console.log('approve', tokenAmount, BigInt(Number(tokenAmount) * 10 ** 2))
    const result = writeContract({
      address: contractAddress.tokenAddress as Address,
      abi: allenTokenAbi,
      functionName: 'approve',
      args: [contractAddress.marketAddress as Address, BigInt(Number(tokenAmount) * 10 ** 6)],
    })
    console.log('approve end', result)
  }

  return (
    <div style={{ display: 'flex', gap: '0 10px' }}>
      <div style={{border:'1px solid #ccc',padding:5,}}>
        <h3>铸造一个 NFT</h3>
        <button onClick={handleMintNFT}>铸造一个 NFT</button>
      </div>
      <div style={{border:'1px solid #ccc',padding:5,}}>
        <h3>给市场授权出售 NFT 权限</h3>
        <button onClick={approvalForAll}>给市场授权售卖 NFT 权限</button>
      </div>
      <div style={{border:'1px solid #ccc',padding:5,}}>
        <h3>给市场授权使用代币的数量</h3>
        代币数量: <input type="text" value={tokenAmount}
          onChange={e => setTokenAmount(e.target.value)} /><br></br>
        <button onClick={approve}>给市场授权使用代币的数量</button>
      </div>
    </div>
  );
};

export default MintNFT;
