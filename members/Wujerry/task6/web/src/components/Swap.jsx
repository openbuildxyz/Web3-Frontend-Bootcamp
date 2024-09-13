import { CryptoInput } from '@ant-design/web3'
import { useState } from 'react'
import {
  readContract,
  writeContract,
  getBalance,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { SwapOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useDebounce } from './../utils'
import { Token, CurrencyAmount, TradeType } from '@uniswap/sdk-core'
import { Route, Pair, computePairAddress, Trade } from '@uniswap/v2-sdk'
import { formatEther, parseEther } from 'viem'
import { Slider } from 'antd'
import Liquidity from './Liquidity'
import { config } from '../config'
import { IUniswapV2PairAbi } from '../abi/IUniswapV2Pair'
import { Router02Abi } from '../abi/UniswapV2Router02'
import { FACTORY_ADDRESS, ROUTER_ADDRESS } from '../consts'
import { Tokens } from '../tokens'

async function createPair(tokenA, tokenB) {
  // const pairAddress = Pair.getAddress( USDTToken, USDCToken)
  //  Pair.getAddress 方法无法修改 FACTORY_ADDRESS， 使用 computePairAddress
  const pairAddress = computePairAddress({
    factoryAddress: FACTORY_ADDRESS,
    tokenA,
    tokenB,
  })
  console.log('pairAddress:' + pairAddress)
  const reserves = await readContract(config, {
    address: pairAddress,
    abi: IUniswapV2PairAbi,
    functionName: 'getReserves',
  })
  console.log(reserves)

  const [reserve0, reserve1] = reserves

  const tokens = [tokenA, tokenB]
  const [token0, token1] = tokens[0].sortsBefore(tokens[1])
    ? tokens
    : [tokens[1], tokens[0]]

  const pair = new Pair(
    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
    CurrencyAmount.fromRawAmount(token1, reserve1.toString())
  )
  return pair
}

export default function Swap({ walletAddr }) {
  const [cryptoPairA, setCryptoPairA] = useState()
  const [cryptoPairB, setCryptoPairB] = useState()
  const [slippage, setSlippage] = useState(90)
  const [loading, setLoading] = useState(false)

  const [tokenBalances, setTokenBalances] = useState([])

  const swap = async () => {
    await approve()
    const tokenA = new Token(
      cryptoPairA.token.chainId,
      cryptoPairA.token.address,
      cryptoPairA.token.decimal
    )
    const tokenB = new Token(
      cryptoPairB.token.chainId,
      cryptoPairB.token.address,
      cryptoPairB.token.decimal
    )
    const pair = await createPair(tokenA, tokenB)
    const route = new Route([pair], tokenA, tokenB)

    const amountIn = cryptoPairA.amount
    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(tokenA, amountIn.toString()),
      TradeType.EXACT_INPUT
    )

    const amountOutMin = (
      (cryptoPairB.amount * BigInt(slippage)) /
      100n
    ).toString()
    const path = [tokenA.address, tokenB.address]
    const to = walletAddr
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20

    const result = await writeContract(config, {
      address: ROUTER_ADDRESS,
      abi: Router02Abi,
      functionName: 'swapExactTokensForTokens',
      args: [
        parseEther(trade.inputAmount.toExact()),
        amountOutMin,
        path,
        to,
        deadline,
      ],
    })
    await waitForTransactionReceipt(config, {
      hash: result,
    })
    handleQueryCrypto(0, cryptoPairA.token)
    handleQueryCrypto(1, cryptoPairB.token)
    setCryptoPairA({ ...cryptoPairA, amount: undefined, inputString: '' })
    setCryptoPairB({ ...cryptoPairB, amount: undefined, inputString: '' })
  }

  // 代币切换
  const handleQueryCrypto = async (crptoIndex, token) => {
    const newTokenBalances = [...tokenBalances]
    if (!token) {
      newTokenBalances[crptoIndex] = undefined

      return setTokenBalances(newTokenBalances)
    }

    const balance = await getBalance(config, {
      address: walletAddr,
      token: token.address,
    })
    console.log(balance)
    const price = await getPriceFromToken2USDT(token)
    newTokenBalances[crptoIndex] = {
      amount: balance.value,
      unit: '$',
      price: price,
    }
    setTokenBalances(newTokenBalances)
  }

  // 改变数量
  const handleChangeAmount = useDebounce(async (indexToChange, amount) => {
    const newCryptoPair =
      indexToChange === 1 ? { ...cryptoPairB } : { ...cryptoPairA }
    const price = await getPrice(
      cryptoPairA.token,
      cryptoPairB.token,
      indexToChange === 1 ? false : true
    )
    newCryptoPair.amount = BigInt(Number(amount) * price.toSignificant(6))
    newCryptoPair.inputString = formatEther(newCryptoPair.amount)
    indexToChange === 1
      ? setCryptoPairB(newCryptoPair)
      : setCryptoPairA(newCryptoPair)
  }, 500)

  const getPrice = async (tokenA, tokenB, invert) => {
    tokenA = new Token(tokenA.chainId, tokenA.address, tokenA.decimal)
    tokenB = new Token(tokenB.chainId, tokenB.address, tokenB.decimal)
    const pair = await createPair(tokenA, tokenB)
    const route = new Route([pair], tokenA, tokenB)
    if (invert) return route.midPrice.invert()
    return route.midPrice
  }

  const getPriceFromToken2USDT = async (token) => {
    if (token.symbol === 'USDT') return 1
    const token2USDT = await getPrice(token, Tokens[0])
    return token2USDT.toSignificant(6)
  }

  const approve = async () => {
    const tx = await writeContract(config, {
      address: cryptoPairA.token.address,
      abi: [
        {
          inputs: [
            { internalType: 'address', name: 'spender', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'approve',
      args: [ROUTER_ADDRESS, cryptoPairA.amount],
    })
    await waitForTransactionReceipt(config, {
      hash: tx,
    })
  }

  return (
    <div className='flex'>
      <div>
        <h1 className='font-bold text-2xl'>Swap</h1>
        <Flex vertical align='center' style={{ width: 456 }} gap={16}>
          <div className='w-full'>
            <span>Slippage: {slippage} %</span>
            <Slider
              defaultValue={90}
              value={slippage}
              onChange={(val) => setSlippage(val)}
            />
          </div>
          <CryptoInput
            header={'Sell'}
            value={cryptoPairA}
            balance={tokenBalances[0]}
            onChange={(crypto) => {
              setCryptoPairA(crypto)
              if (crypto?.token?.symbol !== cryptoPairA?.token?.symbol) {
                handleQueryCrypto(0, crypto?.token)
              }
              if (crypto?.amount) {
                handleChangeAmount(1, crypto.amount)
              }
            }}
            tokenList={Tokens}
          />
          <span
            style={{
              width: 30,
              height: 30,
              background: '#fff',
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              marginBlock: -24,
              zIndex: 2,
              textAlign: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => {
              setCryptoPairA({ ...cryptoPairB })
              setCryptoPairB({ ...cryptoPairA })

              setTokenBalances([tokenBalances[1], tokenBalances[0]])
            }}
          >
            <SwapOutlined
              style={{
                fontSize: 18,
                transform: 'rotate(90deg)',
                marginBlockStart: 6,
              }}
            />
          </span>
          <CryptoInput
            header={'Buy'}
            value={cryptoPairB}
            balance={tokenBalances[1]}
            onChange={(crypto) => {
              setCryptoPairB(crypto)
              if (crypto?.token?.symbol !== cryptoPairB?.token?.symbol) {
                handleQueryCrypto(1, crypto?.token)
              }
              if (crypto?.amount) {
                handleChangeAmount(0, crypto.amount)
              }
            }}
            tokenList={Tokens}
          />
          <Button
            loading={loading}
            type='primary'
            size='large'
            style={{ width: '100%' }}
            onClick={async () => {
              setLoading(true)
              try {
                await swap()
              } catch (e) {
                console.log(e)
                setLoading(false)
              }
              setLoading(false)
            }}
          >
            Swap
          </Button>
        </Flex>
      </div>
      <div className='border mx-20'></div>
      <div className='ml-10'>
        <h1 className='font-bold text-2xl'>Liquidity</h1>
        <Liquidity walletAddr={walletAddr}></Liquidity>
      </div>
    </div>
  )
}
