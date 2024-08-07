import { CryptoInput } from '@ant-design/web3'
import { useState } from 'react'
import {
  readContract,
  writeContract,
  getBalance,
  waitForTransactionReceipt,
} from '@wagmi/core'
import { Button, Flex } from 'antd'
import { useDebounce } from './../utils'
import { Token, CurrencyAmount } from '@uniswap/sdk-core'
import { Route, Pair, computePairAddress } from '@uniswap/v2-sdk'
import { formatEther } from 'viem'
import { config } from '../config'
import { IUniswapV2PairAbi } from '../abi/IUniswapV2Pair'
import { Router02Abi } from '../abi/UniswapV2Router02'
import { FACTORY_ADDRESS, ROUTER_ADDRESS } from '../consts'
import { Tokens } from '../tokens'

export default function Liquidity({ walletAddr }) {
  const [cryptoPairA, setCryptoPairA] = useState()
  const [cryptoPairB, setCryptoPairB] = useState()
  const [reserves, setReserves] = useState(['', ''])

  const [tokenBalances, setTokenBalances] = useState([])
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

  const createPair = async (tokenA, tokenB) => {
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
    setReserves([formatEther(reserve0), formatEther(reserve1)])

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

  const approve = async (address, amount) => {
    const tx = await writeContract(config, {
      address: address,
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
      args: [ROUTER_ADDRESS, amount],
    })
    await waitForTransactionReceipt(config, {
      hash: tx,
    })
  }

  const addLiquidity = async () => {
    await approve(cryptoPairA.token.address, cryptoPairA.amount)
    await approve(cryptoPairB.token.address, cryptoPairB.amount)
    try {
      await writeContract(config, {
        address: ROUTER_ADDRESS,
        abi: Router02Abi,
        functionName: 'addLiquidity',
        args: [
          cryptoPairA.token.address,
          cryptoPairB.token.address,
          cryptoPairA.amount,
          cryptoPairB.amount,
          1,
          1,
          walletAddr,
          Math.floor(Date.now() / 1000) + 10 * 60,
        ],
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Flex vertical align='center' style={{ width: 456 }} gap={16}>
      <div className='py-16'>
        <div>
          <span>{cryptoPairA?.token?.symbol ?? '--'}:</span>
          <span>{reserves[0]}</span>
        </div>
        <div>
          <span>{cryptoPairB?.token?.symbol ?? '--'}:</span>
          <span>{reserves[1]}</span>
        </div>
      </div>
      <CryptoInput
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
      <CryptoInput
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
        type='primary'
        size='large'
        style={{ width: '100%' }}
        onClick={() => {
          addLiquidity()
        }}
      >
        Add Liquidity
      </Button>
    </Flex>
  )
}
