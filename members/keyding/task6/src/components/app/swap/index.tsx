import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { UNISWAP_V2_ROUTER_CONTRACT, WAGMI_CONFIG } from "@/lib/constants"
import {
  CurrencyAmount,
  Percent,
  type Token,
  TradeType,
} from "@uniswap/sdk-core"
import { type Route, Trade } from "@uniswap/v2-sdk"
import { writeContract } from "@wagmi/core"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { type Address, parseUnits } from "viem"
import { useAccount } from "wagmi"
import { mainnet } from "wagmi/chains"
import { Loading } from "./loading"
import { SwapItem, type SwapValue } from "./swap-item"
import { createRoute, createToken, getContractAbi, getTokenInfo } from "./utils"

interface TokenItem {
  amount: number | undefined
  symbol: string
}

let UniswapRoute: Route<Token, Token> | null = null

export function Swap() {
  const { chainId, address } = useAccount()
  const [tokens, setTokens] = useState<TokenItem[]>([])
  const [inExchange, setInExchange] = useState([false, false])
  const [inTransition, setInTransition] = useState(false)
  const [enableSwap, setEnableSwap] = useState(false)

  useEffect(() => {
    const allSymbolsExist = tokens.every((token) => token.symbol)
    const allAmountGreaterThanZer0 = tokens.every(
      (token) => token.amount && token.amount > 0,
    )
    setEnableSwap(
      tokens.length > 1 &&
        !inExchange[0] &&
        !inExchange[1] &&
        allSymbolsExist &&
        allAmountGreaterThanZer0,
    )
  }, [tokens, inExchange])

  const _setInExchangeByIndex = (index: number, status: boolean) => {
    setInExchange((prevState) => {
      const newInExchange = [...prevState]
      newInExchange[index] = status
      return newInExchange
    })
  }
  const _clearInExchange = () => {
    setInExchange([false, false])
  }
  const getRoute = async (tokens: TokenItem[]) => {
    const allSymbolsExist = tokens.every((token) => token.symbol)
    const hasAmountGreaterThanZero = !!tokens.find(
      (token) => token.amount && token.amount > 0,
    )

    if (allSymbolsExist && hasAmountGreaterThanZero) {
      const _chainId = chainId || mainnet.id
      const uniswapTokens = tokens.map((token) =>
        createToken(_chainId, token.symbol),
      )

      return await createRoute(chainId || mainnet.id, uniswapTokens)
    }

    return null
  }

  // Swap price
  const onSwapChange = async (value: SwapValue, index: number) => {
    const newTokens = [...tokens]
    const amount = value.amount ? Number(value.amount) : undefined
    const symbol = value.symbol

    newTokens[index] = { amount, symbol }
    setTokens(newTokens)

    const canGetRoute =
      newTokens.length > 1 && newTokens.every((token) => token.symbol)
    if (canGetRoute) {
      const isSymbolChange = tokens[index]?.symbol !== symbol
      const isSameSymbol = newTokens[0].symbol === newTokens[1].symbol
      const isClearAmount = amount === undefined
      const isZeroAmount = amount === 0

      // If one token amount is empty, then all are empty
      if (!isSymbolChange && isClearAmount) {
        newTokens[0].amount = newTokens[1].amount = undefined
        return
      }

      // If one token amount is 0, then all are 0
      if (!isSymbolChange && isZeroAmount) {
        newTokens[0].amount = newTokens[1].amount = 0
        return
      }

      // Interchange token when same symbol
      if (isSymbolChange && isSameSymbol) {
        setTokens([tokens[1], tokens[0]])
        return
      }

      _setInExchangeByIndex(isSymbolChange ? index : Number(!index), true)
      UniswapRoute = await getRoute(newTokens)
      if (UniswapRoute) {
        const midPrice = Number(UniswapRoute?.midPrice.toSignificant(6))
        const [tokenIn, tokenOut] = newTokens
        const tokenInAmount = tokenIn.amount!
        const tokenOutAmount = tokenOut.amount!
        const isTokenInChange = index === 0

        // symbol change
        if (isSymbolChange) {
          newTokens[index].amount = isTokenInChange
            ? tokenOutAmount / midPrice
            : tokenInAmount * midPrice
        }
        // amount change
        else {
          newTokens[isTokenInChange ? 1 : 0].amount = isTokenInChange
            ? tokenInAmount * midPrice
            : tokenOutAmount / midPrice
        }
        setTokens(newTokens)
      }
      _clearInExchange()
    }
  }

  // Switch token
  const handleSwitchToken = async () => {
    const newTokens = [tokens[1], tokens[0]]
    _setInExchangeByIndex(0, true)
    UniswapRoute = await getRoute(newTokens)
    if (UniswapRoute) {
      const midPrice = Number(UniswapRoute?.midPrice.toSignificant(6))
      const [, tokenOut] = newTokens
      const tokenOutAmount = tokenOut.amount!
      newTokens[0].amount = tokenOutAmount / midPrice
    }
    setTokens(newTokens)
    _clearInExchange()
  }

  // Swap transition
  const handleSwapTransition = async () => {
    if (!chainId || !address) return

    try {
      setInTransition(true)
      if (UniswapRoute) {
        const tokenInInfo = getTokenInfo(tokens[0].symbol)!
        const tokenOutInfo = getTokenInfo(tokens[1].symbol)!

        // create Trade
        const tokenInAmount = parseUnits(
          `${tokens[0].amount}`,
          tokenInInfo.decimals,
        )
        const uniswapTokens = tokens.map((token) =>
          createToken(chainId, token.symbol),
        )
        const trade = new Trade(
          UniswapRoute,
          CurrencyAmount.fromRawAmount(
            uniswapTokens[0],
            tokenInAmount.toString(),
          ),
          TradeType.EXACT_INPUT,
        )
        console.log(trade)

        // console.log(
        //   slippageTolerance,
        //   trade.inputAmount.toExact(),
        //   trade.minimumAmountOut(slippageTolerance).toExact(),
        //   tokenInInfo.chains[chainId],
        // )

        // approve
        const tokenInAddress = tokenInInfo.chains.find(
          (chain) => chain.chainId === chainId,
        )!.contract as Address
        const tokenInAbi = await getContractAbi(chainId, tokenInAddress)
        await writeContract(WAGMI_CONFIG, {
          address: tokenInAddress,
          abi: tokenInAbi,
          functionName: "approve",
          args: [UNISWAP_V2_ROUTER_CONTRACT, tokenInAmount],
        })

        // swap
        const tokenOutAddress = tokenOutInfo.chains.find(
          (chain) => chain.chainId === chainId,
        )!.contract as Address
        const slippageTolerance = new Percent("50", "10000")
        const tokenOutAmountMin = parseUnits(
          trade.minimumAmountOut(slippageTolerance).toExact(),
          tokenOutInfo.decimals,
        )
        const deadline = Math.ceil(Date.now() + 20 * 1000 * 60)
        const uniswapRouteAbi = await getContractAbi(
          chainId,
          UNISWAP_V2_ROUTER_CONTRACT,
        )
        await writeContract(WAGMI_CONFIG, {
          address: UNISWAP_V2_ROUTER_CONTRACT,
          abi: uniswapRouteAbi,
          functionName: "swapExactTokensForTokens",
          args: [
            tokenInAmount,
            tokenOutAmountMin,
            [tokenInAddress, tokenOutAddress],
            address,
            deadline,
          ],
        })
      }
    } catch (error) {
      console.log(error)
    }
    setInTransition(false)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <h1 className="text-5xl italic text-foreground font-bold">
        Swap anytime, anywhere
      </h1>
      <Card className="relative">
        {inTransition && <Loading />}
        <CardContent className="p-8 ">
          <div className="w-[440px] flex flex-col items-center gap-1">
            <SwapItem
              loading={inExchange[0]}
              value={{
                amount: `${tokens[0]?.amount}`,
                symbol: tokens[0]?.symbol,
              }}
              onChange={(value: SwapValue) => onSwapChange(value, 0)}
            />
            <Badge
              variant="secondary"
              className="p-1 -ml-20 cursor-pointer"
              onClick={handleSwitchToken}
            >
              <ArrowUpDownIcon size="14" />
            </Badge>
            <SwapItem
              loading={inExchange[1]}
              value={{
                amount: `${tokens[1]?.amount}`,
                symbol: tokens[1]?.symbol,
              }}
              onChange={(value: SwapValue) => onSwapChange(value, 1)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={!enableSwap}
            className="w-full"
            onClick={() => handleSwapTransition()}
          >
            SWAP
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
