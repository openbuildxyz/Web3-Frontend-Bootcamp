import { Config } from 'wagmi';
import { Address } from 'viem';
import { WriteContractMutate } from 'wagmi/query';
import { Pair, Route, Trade } from '@uniswap/v2-sdk'
import { ethers, AlchemyProvider } from "ethers";
import { ChainId, Token, CurrencyAmount, Percent, TradeType } from '@uniswap/sdk-core'

import { token_abi, pool_abi, router02_abi, router02_address } from './uniswap_v2_meta'
import tokenlist from './token_list.json'


const provider = new AlchemyProvider(undefined, 'wb4CE0rqe0C7GMFMG6OVJPcRMlAeolPO')

function contract2Token(contract: string): Token | undefined {
  const token = tokenlist.find(item => item.address === contract)
  if (token === undefined) {
    return undefined
  }
  return new Token(ChainId.MAINNET, contract, token.decimals)
}

async function createPair(tokenFrom: Token, tokenTo: Token): Promise<Pair> {
  const pairAddress = Pair.getAddress(tokenFrom, tokenTo)

  const pairContract = new ethers.Contract(pairAddress, pool_abi, provider)
  const reserves = await pairContract["getReserves"]()
  const [reserve0, reserve1] = reserves

  const tokens = [tokenFrom, tokenTo]
  const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]

  const pair = new Pair(CurrencyAmount.fromRawAmount(token0, Number(reserve0)), CurrencyAmount.fromRawAmount(token1, Number(reserve1)))
  return pair
}

function getFuncName(tokenFrom: Token, tokenTo: Token): string {
  if (tokenFrom.address == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    return "swapExactETHForTokens"
  } else if (tokenTo.address == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    return "swapExactTokensForETH"
  }
  return "swapExactTokensForTokens"
}

async function fetchErate(tokenFrom: Token, tokenTo: Token): Promise<number> {
  const pair = await createPair(tokenFrom, tokenTo)
  const route = new Route([pair], tokenFrom, tokenTo)

  return Number(route.midPrice.toSignificant(6))
}

async function uniswapTrade(tokenFrom: Token, tokenTo: Token, amountIn: string, account: string | undefined, writeContract: WriteContractMutate<Config, unknown>) {
  const parsedAmountIn = Number(amountIn) * (10 ** tokenFrom.decimals)

  const pair = await createPair(tokenFrom, tokenTo)
  const route = new Route([pair], tokenFrom, tokenTo)
  const trade = new Trade(route, CurrencyAmount.fromRawAmount(tokenFrom, parsedAmountIn), TradeType.EXACT_INPUT)
  const slippageTolerance = new Percent('50', '10000')

  const funcName = getFuncName(tokenFrom, tokenTo)

  const amountOutMin = Number(trade.minimumAmountOut(slippageTolerance).toExact()) * (10 ** tokenTo.decimals)
  const path = [tokenFrom.address, tokenTo.address]
  const deadline = Math.floor(Date.now() / 1000) + 60 * 3
  const value = Number(trade.inputAmount.toExact()) * (10 ** tokenFrom.decimals) // // needs to be converted to e.g. decimal string

  writeContract(
    {
      address: tokenFrom.address as Address,
      abi: token_abi,
      functionName: "approve",
      args: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", value],
    }, {
    onSuccess: (tx) => {
      console.log(tx)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  console.log("trading amount: ", value)
  console.log("trading amountin: ", parsedAmountIn)
  console.log("slippery price: ", amountOutMin)

  writeContract({
    address: router02_address,
    abi: router02_abi,
    functionName: funcName,
    args: [value, amountOutMin, path, account, deadline]
  }, {
    onSuccess: (tx) => {
      console.log(tx)
    },
    onError: (err) => {
      console.log(err)
    }
  })
}

export { contract2Token, createPair, fetchErate, uniswapTrade }
