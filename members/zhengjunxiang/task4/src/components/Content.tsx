import { useCallback, useState } from 'react'
import { Button, message, Input } from 'antd'
import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import {useAccount} from 'wagmi'
import { config } from '../config'
import contractABIERC20Token from '../../../hardhat-project/artifacts/contracts/ERC20Token.sol/ERC20Token.json'
import contractABINFT from '../../../hardhat-project/artifacts/contracts/NFT.sol/NFT.json'
import contractABINFTMarket from '../../../hardhat-project/artifacts/contracts/NFTMarket.sol/NFTMarket.json'


function Content() {
  const [loading, setLoading] = useState(false)
  const [nftUrl, setNftUrl] = useState('')
  const [approveNftId, setApproveNftId] = useState('')
  const [nftId, setNftId] = useState('')
  const [listNfts, setListNfts] = useState<unknown[]>([]) // 已上架的 NFT
  const [nftPrice, setNftPrice] = useState('')
  const [buyNftId, setBuyNftId] = useState('')
  const [owerNfts, setOwerNfts] = useState('')
  const [approveTokenAmount, setApproveTokenAmount] = useState('')
  const [nftIds, setNftIds] = useState<number[]>([])
  const [messageApi, contextHolder] = message.useMessage()

  const { address } = useAccount()

  const erc20Address = import.meta.env.VITE_ERC20TOKEN_ADDRESS
  const nftAddress = import.meta.env.VITE_NFT_ADDRESS
  const nftMarketAddress = import.meta.env.VITE_NFTMARKET_ADDRESS

  const waitForTrans = useCallback(async (result: string, message: string = '') => {
    const txReceipt = await waitForTransactionReceipt(config, { hash: result })
      if (txReceipt.status === 'success') {
        messageApi.open({
          type: 'success',
          duration: 4,
          content: message,
        })
      }
      setLoading(false)
  }, [messageApi])

  // 获取所有已经铸造的nft
  const getCreatedNFTs = async () => {
    const result = await readContract(config, {
      address: nftAddress, // 合约地址
      abi: contractABINFT.abi, // ABI文件
      functionName: 'getAllTokens',
    })
    setNftIds(result as number[])
  }

  // 铸造NFT
  const createNFT = useCallback(async () => {
    setLoading(true)
    try {
      const result = await writeContract(config, {
        address: nftAddress, // 合约地址
        abi: contractABINFT.abi, // ABI文件
        functionName: 'createNFT',
        args: [nftUrl],
      })
      waitForTrans(result, '铸造 NFT 成功')
    } catch (error) {
      setLoading(false)
      console.error('error', error)
    }
  }, [nftAddress, nftUrl, waitForTrans])

  // nft 给交易所授权
  const approveToMarket = useCallback(async () => {
    setLoading(true)
    try {
      const result = await writeContract(config, {
        address: nftAddress, // 合约地址
        abi: contractABINFT.abi, // ABI文件
        functionName: 'approve',
        args: [nftMarketAddress, Number(approveNftId)],
      })
      waitForTrans(result, '给交易所授权成功')
    } catch (error) {
      setLoading(false)
      console.error('error', error)
    }
  }, [nftAddress, nftMarketAddress, approveNftId, waitForTrans])

  // 获取已经上架的 NFT
  const getAllSellingListings = async () => {
    const result = await readContract(config, {
      address: nftMarketAddress, // 合约地址
      abi: contractABINFTMarket.abi, // ABI文件
      functionName: 'getAllSellingListings',
    })
    setListNfts(result as unknown[])
  }

  // 上架 NFT
  const listNFT = useCallback(async () => {
    setLoading(true)
    try {
      const result = await writeContract(config, {
        address: nftMarketAddress, // 合约地址
        abi: contractABINFTMarket.abi, // ABI文件
        functionName: 'listNFT',
        args: [nftAddress, Number(nftId), Number(nftPrice)],
      })
      waitForTrans(result, '上架 NFT成功')
    } catch (error) {
      setLoading(false)
      console.error('error', error)
    }
  }, [nftMarketAddress, nftAddress, nftId, nftPrice, waitForTrans])

  // 给交易所授权多少个代币
  const tokenApprove = useCallback(async () => {
    setLoading(true)
    try {
      const result = await writeContract(config, {
        address: erc20Address, // 合约地址
        abi: contractABIERC20Token.abi, // ABI文件
        functionName: 'approve',
        args: [nftMarketAddress, Number(approveTokenAmount)],
      })
      waitForTrans(result, '给交易所授权成功')
    } catch (error) {
      setLoading(false)
      console.error('error', error)
    }
  }, [erc20Address, nftMarketAddress, approveTokenAmount, waitForTrans])

  // 购买NFT
  const buyNFT = useCallback(async () => {
    setLoading(true)
    try {
      const result = await writeContract(config, {
        address: nftMarketAddress, // 合约地址
        abi: contractABINFTMarket.abi, // ABI文件
        functionName: 'purchaseNFT',
        args: [Number(buyNftId)],
      })
      waitForTrans(result, '购买NFT成功')
    } catch (error) {
      setLoading(false)
      console.error('error', error)
    }
  }, [nftMarketAddress, buyNftId, waitForTrans])

  // 查看当前用户有哪些nft
  const getOwerNfts = async () => {
    const result = await readContract(config, {
      address: nftAddress, // 合约地址
      abi: contractABINFT.abi, // ABI文件
      functionName: 'balanceOf',
      args: [address]
    })
    setOwerNfts(result as unknown as string)
  }

  return (
    <>
      {contextHolder}
      <div className='flex'>
        <div className='flex'>
          <Button loading={loading} onClick={getCreatedNFTs}>获取已经铸造的NFTIds</Button>
          [{nftIds.join(',')}]
        </div>
      </div>
      {/* // 铸造NFT */}
      <div className='flex'>
        <div className='flex'>
          <Input value={nftUrl} placeholder='请输入 NFT_URI' onChange={(e) => setNftUrl(e.target.value)} />
          <Button loading={loading} onClick={createNFT}>铸造NFT</Button>
        </div>
      </div>

      {/* // 给交易所授权 */}
      <div className='flex'>
        <div className='flex'>
          <Input value={approveNftId} placeholder='给交易所授权的nftId' onChange={(e) => setApproveNftId(e.target.value)} />
          <Button loading={loading} onClick={approveToMarket}>给交易所授权</Button>
        </div>
      </div>
      {/* // 已上架的NFT */}
      <div className='mb-4'>
        <Button loading={loading} onClick={getAllSellingListings}>已上架的NFT</Button>
        <div className='flex'>
          {
            listNfts.map((nftItem, index) => <div key={index} className='mr-4'>
              <div>nftContract: {nftItem.nftContract}</div>
              <div>price: {String(nftItem.price)}</div>
              <div>seller: {nftItem.seller}</div>
              <div>tokenId: {String(nftItem.tokenId)}</div>
            </div>)
          }
        </div>
      </div>
      {/* 上架 NFT */}
      <div className='flex'>
        <div className='flex'>
          <Input value={nftId} placeholder='nftId' onChange={(e) => setNftId(e.target.value)} />
          <Input value={nftPrice} placeholder='价格' onChange={(e) => setNftPrice(e.target.value)} />
          <Button loading={loading} onClick={listNFT}>上架 NFT</Button>
        </div>
      </div>
      {/* 给交易所授权代币 */}
      <div className='flex'>
        <div className='flex'>
          <Input value={approveTokenAmount} placeholder='所授权代币数量' onChange={(e) => setApproveTokenAmount(e.target.value)} />
          <Button loading={loading} onClick={tokenApprove}>给交易所授权代币</Button>
        </div>
      </div>
      {/* 购买 NFT */}
      <div className='flex'>
        <div className='flex'>
          <Input value={buyNftId} placeholder='nftId' onChange={(e) => setBuyNftId(e.target.value)} />
          <Button loading={loading} onClick={buyNFT}>购买 NFT</Button>
        </div>
      </div>
      {/* 当前地址已有nfts */}
      <div className='flex'>
        <Button loading={loading} onClick={getOwerNfts}>当前地址已有nft数量</Button>
        {String(owerNfts)}
      </div>
    </>
  )
}

export default Content;