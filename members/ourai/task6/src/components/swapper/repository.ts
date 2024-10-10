import axios from 'axios'
import { CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { Pair, Route, Trade } from '@uniswap/v2-sdk'
import { readContract, writeContract } from '@wagmi/core'
import { parseUnits } from 'viem'
import { multiply } from '@ntks/toolbox'

import { ETHERSCAN_API_KEY, ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT, getWagmiConfig, getEtherscanApiUrl } from '../../helper'
import type { CryptoValue, UniswapToken, ContractAddress, ContractAbi } from './typing'
import { resolveValidUniswapTokens } from './helper'

const cachedAbiMap: Record<ContractAddress, ContractAbi> = {}

async function getContractAbiByAddress(chainId: number, address: ContractAddress): Promise<ContractAbi> {
  if (cachedAbiMap[address]) {
    return cachedAbiMap[address]
  }

  const { status, data } = await axios.get(getEtherscanApiUrl(chainId), {
    params: {
      module: 'contract',
      action: 'getabi',
      address,
      apikey: ETHERSCAN_API_KEY,
    }
  })

  if (status !== 200 || data.status !== '1') {
    return []
  }

  const abi = JSON.parse(data.result)

  cachedAbiMap[address] = abi

  return abi
}

async function resolveUniswapRoute(chainId: number, tokens: UniswapToken[]) {
  const pairAddr = Pair.getAddress(tokens[0], tokens[1]) as ContractAddress
  const abi = await getContractAbiByAddress(chainId, pairAddr)

  const [reserve0, reserve1] = await readContract(getWagmiConfig(), { address: pairAddr, abi, functionName: 'getReserves' })
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

  const uniswapPair = new Pair(CurrencyAmount.fromRawAmount(token0, `${reserve0}`), CurrencyAmount.fromRawAmount(token1, `${reserve1}`))

  return new Route([uniswapPair], tokens[0], tokens[1])
}

async function getSwappedTokenPair(chainId: number, pair: CryptoValue[]): Promise<CryptoValue[]> {
  const tokens = resolveValidUniswapTokens(pair, chainId)

  if (tokens.length < 2) {
    return pair
  }

  const uniswapRoute = await resolveUniswapRoute(chainId, tokens)

  const [source, target] = pair
  const relatedAmount = uniswapRoute.midPrice.toSignificant(6)
  const swappedAmount = `${multiply(Number(relatedAmount), Number(source!.inputString))}`

  return [source, { ...target, inputString: swappedAmount, amount: parseUnits(swappedAmount, target!.token!.decimal) }]
}

async function sendSwapTransaction(account: ContractAddress, chainId: number, pair: CryptoValue[]) {
  const tokens = resolveValidUniswapTokens(pair, chainId)

  if (tokens.length < 2) {
    return
  }

  const [token0, token1] = tokens

  const uniswapRoute = await resolveUniswapRoute(chainId, tokens)
  const uniswapTrade = new Trade(uniswapRoute, CurrencyAmount.fromRawAmount(token0, `${pair[0]?.amount}`), TradeType.EXACT_INPUT)

  const slippageTolerance = new Percent('50', '10000')
  const amountOutMin = parseUnits(uniswapTrade.minimumAmountOut(slippageTolerance).toExact(), token1.decimals)
  const amountIn = parseUnits(uniswapTrade.inputAmount.toExact(), token0.decimals)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20

  const sourceTokenAddr = token0.address as ContractAddress
  const wagmiConfig = getWagmiConfig()
  const tokenAbi = await getContractAbiByAddress(chainId, sourceTokenAddr)

  const approveResult = await writeContract(wagmiConfig, {
    address: sourceTokenAddr,
    abi: tokenAbi,
    functionName: 'approve',
    args: [ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT, amountIn]
  })

  console.log('approve result', approveResult)

  const routerAbi = await getContractAbiByAddress(chainId, ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT)
  const result = await writeContract(wagmiConfig, {
    address: ETH_MAINNET_UNISWAP_V2_ROUTER_CONTRACT,
    abi: routerAbi,
    functionName: 'swapExactTokensForTokens',
    args: [amountIn, amountOutMin, [sourceTokenAddr, token1.address], account, deadline],
  })

  console.log('send result', result)

  return result
}

export { getSwappedTokenPair, sendSwapTransaction }
