import { useReadContracts, useReadContract, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from '@wagmi/core'
import { formatUnits, parseUnits } from 'viem'
import { useState } from 'react'
import { config } from '../config'
import { MarketAbi } from '../abi/market'
import { NFTAbi } from '../abi/nft'
import { TokenAbi } from '../abi/token'
import {
  NFTMarketAddr,
  NFTSrc,
  ERC721TokenAddr,
  EtherScanAddr,
  ERC20TokenAddr,
} from '../consts'
import { formatAddr } from '../utils'

export default function NFTList({ walletAddr }) {
  const result = useReadContracts({
    contracts: [
      {
        abi: MarketAbi,
        address: NFTMarketAddr,
        functionName: 'getAllOrders',
      },
      {
        abi: NFTAbi,
        address: ERC721TokenAddr,
        functionName: 'balanceOf',
        args: [walletAddr],
      },
    ],
  })

  if (result.status !== 'success') {
    return <div></div>
  }
  return (
    <div>
      <ListGrid
        type='listed'
        items={result.data[0].result}
        walletAddr={walletAddr}
      ></ListGrid>
      <ListGrid
        type='unlisted'
        items={Array(Number(result.data[1].result)).fill(0)}
        listedIds={result.data[0].result.map((item) => item.tokenId)}
        walletAddr={walletAddr}
      ></ListGrid>
    </div>
  )
}

function ListedCard({ item, walletAddr, index }) {
  const { writeContractAsync } = useWriteContract()
  const isOwner = walletAddr === item.owner
  const handleClick = async (index) => {
    if (isOwner) {
      // 下架
      await writeContractAsync({
        abi: MarketAbi,
        address: NFTMarketAddr,
        functionName: 'revoke',
        args: [index],
      })
    } else {
      // 购买
      const approveHash = await writeContractAsync({
        abi: TokenAbi,
        address: ERC20TokenAddr,
        functionName: 'approve',
        args: [NFTMarketAddr, item.price],
      })
      console.log(approveHash)
      await waitForTransactionReceipt(config, {
        hash: approveHash,
      })
      const result = await writeContractAsync({
        abi: MarketAbi,
        address: NFTMarketAddr,
        functionName: 'purchase',
        args: [index],
      })
      console.log(result)
    }
  }
  return (
    <div className='shadow-md rounded-md border overflow-hidden'>
      <div className='aspect-square'>
        <img src={NFTSrc} alt='' className='w-full h-full' />
      </div>
      <div>
        <div className='flex p-2'>
          <div className='flex-1'>TokenID</div>
          <div>{Number(item.tokenId)}</div>
        </div>
        <div className='flex p-2'>
          <div className='flex-1'>价格</div>
          <div>{formatUnits(item.price, 18)}</div>
        </div>
        <div className='flex p-2'>
          <div className='flex-1'>上架时间</div>
          <div>{new Date(Number(item.listTime * 1000n)).toLocaleString()}</div>
        </div>
        <div className='flex p-2'>
          <span className='flex-1'>拥有者</span>
          <a
            href={EtherScanAddr + item.owner}
            className='text-blue-600'
            target='_blank'
          >
            {formatAddr(item.owner)}
          </a>
        </div>
        <div className='flex justify-center p-2'>
          <button
            className='border py-2 px-16 text-white bg-blue-600 rounded'
            onClick={() => handleClick(index)}
          >
            {isOwner ? '下架' : '购买'}
          </button>
        </div>
      </div>
    </div>
  )
}

function UnlistedCard({ item, walletAddr, listedIds }) {
  const [price, setPrice] = useState(0)
  const { writeContractAsync } = useWriteContract()
  const { data, status } = useReadContract({
    abi: NFTAbi,
    address: ERC721TokenAddr,
    functionName: 'tokenOfOwnerByIndex',
    args: [walletAddr, item],
  })

  const handleList = async () => {
    if (price <= 0) return window.alert('请输入价格')
    const approveResult = await writeContractAsync({
      abi: NFTAbi,
      address: ERC721TokenAddr,
      functionName: 'approve',
      args: [NFTMarketAddr, data],
    })
    await waitForTransactionReceipt(config, {
      hash: approveResult,
    })

    const listResult = await writeContractAsync({
      abi: MarketAbi,
      address: NFTMarketAddr,
      functionName: 'list',
      args: [ERC721TokenAddr, data, parseUnits(price, 18)],
    })
    console.log(listResult)
  }

  if (status !== 'success' || listedIds.includes(data)) {
    return <div></div>
  }
  return (
    <div className='w-1/4 p-2'>
      <div className='shadow-md rounded-md border overflow-hidden'>
        <div className='aspect-square'>
          <img src={NFTSrc} alt='' className='w-full h-full' />
        </div>
        <div>
          <div className='flex p-2'>
            <div className='flex-1'>TokenID</div>
            <div>{Number(data)}</div>
          </div>
          <div>
            <input
              type='number'
              name=''
              id=''
              placeholder='请输入价格...'
              className='w-full p-2'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='flex justify-center p-2'>
            <button
              className='border py-2 px-16 text-white bg-blue-600 rounded'
              onClick={() => handleList()}
            >
              上架
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListGrid({ type, items, walletAddr, listedIds }) {
  const title = type === 'listed' ? '已上架' : '未上架'
  return (
    <div>
      <div className='p-2 text-lg'>{title}</div>
      <div className='flex'>
        {items.length === 0 ? (
          <div className='p-4'>暂无数据...</div>
        ) : type === 'listed' ? (
          items.map((item, index) => (
            <div className='w-1/4 p-2' key={item.tokenId}>
              <ListedCard
                item={item}
                index={index}
                walletAddr={walletAddr}
              ></ListedCard>
            </div>
          ))
        ) : (
          items.map((item, index) => (
            <UnlistedCard
              walletAddr={walletAddr}
              item={index}
              key={index}
              listedIds={listedIds}
            ></UnlistedCard>
          ))
        )}
      </div>
    </div>
  )
}
