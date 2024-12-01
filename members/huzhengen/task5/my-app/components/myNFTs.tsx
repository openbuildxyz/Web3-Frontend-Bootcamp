import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount, useBalance, useReadContract, useToken, useWriteContract } from 'wagmi';
import { formatEther, Address } from 'viem'
import { allenTokenAbi } from '../abis/allenTokenAbi'
import { allenNFTExchangeAbi } from '../abis/allenNFTExchangeAbi';
import { mainnet, sepolia } from 'wagmi/chains'
import { useEffect, useState } from 'react';
import { contractAddress } from '../utils/address'
import { log } from 'console';
import { allenNFTTokenAbi } from '../abis/allenNFTTokenAbi';
import { marketNFT } from '../type';

type IState = {
  tokenId: bigint
  price: number
}

type IProps = {
  marketNFTs: readonly marketNFT[]
}

const MyNFTs: NextPage<IProps> = (props) => {
  const { marketNFTs } = props
  const { address } = useAccount()
  // const [myNFTs, setMyNFTs] = useState<IState[]>()
  const defaultTokenUrl = 'https://i.seadn.io/gcs/files/66be20e095f676510f26574a15a348d5.png?auto=format&dpr=1&w=750'


  const myNFTs = marketNFTs.filter(item => item.seller === address)

  // const nfts = useReadContract({
  //   abi: allenNFTTokenAbi,
  //   address: contractAddress.nftAddress as Address,
  //   functionName: 'getAllNFTs',
  //   args: [address!]
  // })
  // console.log('nft', nfts, nfts.data)

  // useEffect(() => {
  //   const data = nfts?.data?.map(item => {
  //     return {
  //       tokenId: item,
  //       price: 0,
  //     }
  //   })
  //   setMyNFTs(data)
  // }, [nfts.data?.length])

  const isNFTActive = (tokenId: bigint) => {
    return marketNFTs.find(item => item.tokenId === tokenId)?.listing
  }


  const { writeContract } = useWriteContract()

  // const handleUploadNFT = (index: number) => {
  //   if (myNFTs) {
  //     const nftTokenId = myNFTs[index].tokenId
  //     const nftPrice = myNFTs[index].price
  //     console.log('upload nft', nftTokenId, nftPrice)
  //     const result = writeContract({
  //       address: contractAddress.marketAddress as Address,
  //       abi: allenNFTExchangeAbi,
  //       functionName: 'sell',
  //       args: [contractAddress.nftAddress as Address, BigInt(nftTokenId), BigInt(nftPrice), ''],
  //     })
  //     console.log('result', result)
  //   }
  // }

  // const changePrice = (price: string, index: number) => {
  //   console.log('change', price)
  //   if (myNFTs) {
  //     myNFTs[index].price = Number(price)
  //     setMyNFTs([...myNFTs])
  //   }
  // }

  return (
    <div>
      <h3>我拥有的 NFT</h3>
      {myNFTs?.map((item, index) => (
        <div key={item.tokenId}>
          <img width={50} src={item.tokenUrl || defaultTokenUrl} alt="" />
          <h5>token id：{Number(item.tokenId)}</h5>
          <span>NFT 合约地址：{item.nftContract}</span><br></br>
          <span>卖家地址：{item.seller}</span><br></br>
          <span>价格：{Number(item.price)}</span><br></br>
          <span>时间：{String(new Date(Number(item.listedAt)))}</span><br></br>
          {/* {!isNFTActive(item.tokenId) &&
            <p>上架价格: <input type="text" value={item.price}
              onChange={e => changePrice(e.target.value, index)} /><br></br></p>} */}
          {isNFTActive(item.tokenId) ? '已上架' : '暂未上架'}
          {/* : <button onClick={() => handleUploadNFT(index)}>上架 NFT</button>} */}
        </div>
      ))}
    </div>
  );
};

export default MyNFTs;
