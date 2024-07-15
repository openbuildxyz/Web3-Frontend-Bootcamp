'use client'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Token, TradeType, CurrencyAmount } from '@uniswap/sdk-core'
import { Pool, TickMath, TICK_SPACINGS, FeeAmount, SwapRouter } from '@uniswap/v3-sdk'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useProvider, useSigner } from 'wagmi'

const POOL_ADDRESS = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8' // ETH/USDC pool on mainnet
const SWAP_ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564'

// Define ABIs
const IUniswapV3PoolABI = [
  'function token0() external view returns (address)',
  'function token1() external view returns (address)',
  'function fee() external view returns (uint24)',
  'function tickSpacing() external view returns (int24)',
  'function liquidity() external view returns (uint128)',
  'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
]

const SwapRouterABI = [
  'function exactInputSingle(tuple(address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)',
]

export default function Home() {
  const [amountIn, setAmountIn] = useState<string>('0.1')
  const [amountOut, setAmountOut] = useState<string>('0')
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  const { address } = useAccount()
  const provider = useProvider()
  const { data: signer } = useSigner()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getPool = async (tokenA: Token, tokenB: Token, poolFee: FeeAmount): Promise<Pool> => {
    if (!provider) throw new Error('No provider')
    const poolContract = new ethers.Contract(POOL_ADDRESS, IUniswapV3PoolABI, provider)
    const [token0, token1, fee, tickSpacing, liquidity, slot0] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ])
    return new Pool(
      tokenA,
      tokenB,
      poolFee,
      slot0[0].toString(),
      liquidity.toString(),
      slot0[1]
    )
  }

  const checkBalance = async (address: string, amountInWei: ethers.BigNumber): Promise<boolean> => {
    if (!provider) throw new Error('No provider')
    const balance = await provider.getBalance(address)
    return balance.gte(amountInWei)
  }

  const swapTokens = async () => {
    if (!provider || !signer || !address) {
      setError("Please connect your wallet")
      return
    }

    setError(null)

    try {
      const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether')
      const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')
      
      const pool = await getPool(WETH, USDC, FeeAmount.MEDIUM)

      const swapRouterContract = new ethers.Contract(SWAP_ROUTER_ADDRESS, SwapRouterABI, signer)

      const amountInWei = ethers.utils.parseEther(amountIn)
      
      // Check if user has sufficient balance
      const hasSufficientBalance = await checkBalance(address, amountInWei)
      if (!hasSufficientBalance) {
        setError("Insufficient balance for the swap")
        return
      }

      // Calculate a reasonable slippage tolerance (e.g., 0.5%)
      const slippageTolerance = 0.005
      const amountOutMinimum = ethers.utils.parseUnits(
        (parseFloat(amountOut) * (1 - slippageTolerance)).toFixed(6),
        6
      )

      const params = {
        tokenIn: WETH.address,
        tokenOut: USDC.address,
        fee: FeeAmount.MEDIUM,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        amountIn: amountInWei,
        amountOutMinimum,
        sqrtPriceLimitX96: 0,
      }

      // Estimate gas with a higher limit
      const gasEstimate = await swapRouterContract.estimateGas.exactInputSingle(params, {
        from: address,
        value: amountInWei,
      })

      // Add a 20% buffer to the gas estimate
      const gasLimit = gasEstimate.mul(120).div(100)

      const transaction = await swapRouterContract.exactInputSingle(params, {
        from: address,
        value: amountInWei,
        gasLimit,
      })

      const tx = await transaction.wait()
      console.log(`Swap successful! Transaction hash: ${tx.transactionHash}`)
    } catch (error: unknown) {
      console.error("Failed to swap tokens:", error)
      setError(`Failed to swap tokens: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Uniswap Interaction App</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ConnectButton />
                {address && (
                  <div>
                    <input
                      type="text"
                      value={amountIn}
                      onChange={(e) => setAmountIn(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Amount to swap (in ETH)"
                    />
                    <p>Estimated USDC out: {amountOut}</p>
                    <button 
                      onClick={swapTokens}
                      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Swap ETH for USDC
                    </button>
                    {error && (
                      <p className="mt-2 text-red-500">{error}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
