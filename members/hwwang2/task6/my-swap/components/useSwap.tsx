import { ethers,AbiCoder, Contract } from 'ethers';
// import { ethers, Contract} from 'ethersv5'
// import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'
import { useSendTransaction, useReadContracts, useWriteContract, useAccount, useChainId, useWalletClient } from 'wagmi';
import { Token, Percent, CurrencyAmount, TradeType } from '@uniswap/sdk-core';
import { Pool,Route,SwapQuoter,Trade,SwapOptions,SwapRouter, computePoolAddress,FeeAmount,POOL_INIT_CODE_HASH } from '@uniswap/v3-sdk';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ISwapRouterArtifact from '@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json';
import IUniswapV3FactoryArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import { erc20Abi, Address } from 'viem';
import { formatUnits, parseUnits } from 'viem'
// 这里引入alphaRouter后，有一个官方已知的bug，还没有修，：https://github.com/Uniswap/smart-order-router/issues/518#issuecomment-2034291988
// import { AlphaRouter, SwapOptionsSwapRouter02, SwapType } from '@uniswap/smart-order-router'

import useFromToken from './useFromToken';
import { config, SEPOLIA_ALCHMY_KEY,UNI_FACTORY_ADDRESS,QUOTER_CONTRACT_ADDRESS,ROUTER_ADDRESS,SELECT_ALCHEMY_NETWORK,MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS } from './config';
import { message } from 'antd';

interface Immutables {
  token0: string;
  token1: string;
  fee: number;
}

interface State {
  liquidity: bigint;
  sqrtPriceX96: bigint;
  tick: number;
}


const provider = new ethers.AlchemyProvider(SELECT_ALCHEMY_NETWORK, SEPOLIA_ALCHMY_KEY);
// const provider = ethers.getDefaultProvider();


const useSwap = (fromTokenAddress: string, toTokenAddress: string,fromTokenDecimal: number, toTokenDecimal: number) => {
  // const provider = useProvider();
  const chainId = useChainId();
  const { sendTransactionAsync } = useSendTransaction()
  const { address } = useAccount();
  const {data:wallet} = useWalletClient();
  
  const baseContract = new Contract(UNI_FACTORY_ADDRESS, IUniswapV3FactoryArtifact.abi, provider)
  
  const tokenA = new Token(chainId, fromTokenAddress, fromTokenDecimal);
  const tokenB = new Token(chainId, toTokenAddress, toTokenDecimal);
  const poolAddress = computePoolAddress({
    factoryAddress: UNI_FACTORY_ADDRESS,
    tokenA, 
    tokenB,
    fee: FeeAmount.MEDIUM,
    chainId,
    // initCodeHashManualOverride:POOL_INIT_CODE_HASH
  });
  
  const { approve } = useFromToken(fromTokenAddress);
  const {writeContractAsync} = useWriteContract()

  const swap = async (amount: number|string, sliper: number) => {
    const immutables = await getPoolImmutables();
    const parsedAmount = parseUnits(amount.toString(), fromTokenDecimal);
    await approve(ROUTER_ADDRESS, amount, fromTokenDecimal);

    const poolContract = new Contract(poolAddress, IUniswapV3PoolABI.abi, provider);
    const [token0, token1, fee, liquidity, slot0] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);
    const pool = new Pool(
      tokenA,
      tokenB,
      Number(fee),
      slot0[0].toString(),
      liquidity.toString(),
      Number(slot0[1]),
    );
    const swapRoute = new Route(
      [pool],
      tokenA,
      tokenB
    );
    // const amountOut = await getOutputQuote(swapRoute)
    const { calldata } = await SwapQuoter.quoteCallParameters(
      swapRoute,
      CurrencyAmount.fromRawAmount(
        tokenA,
        parsedAmount.toString()
      ),
      TradeType.EXACT_INPUT,
      {
        useQuoterV2: true,
      }
    );
    const quoteCallReturnData = await provider.call({
      to: QUOTER_CONTRACT_ADDRESS,
      data: calldata,
    });
    const amountOut = AbiCoder.defaultAbiCoder().decode(['uint256'], quoteCallReturnData);
    const uncheckedTrade = Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        tokenA,
        parsedAmount.toString()
      ),
      outputAmount: CurrencyAmount.fromRawAmount(
        tokenB,
        amountOut.toString()
      ),
      tradeType: TradeType.EXACT_INPUT,
    });
    const options: SwapOptions = {
      slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
      recipient: address as Address,
    };
    const methodParameters = SwapRouter.swapCallParameters([uncheckedTrade], options);
    // const tx = {
    //   data: methodParameters.calldata,
    //   to: ROUTER_ADDRESS,
    //   value: methodParameters.value,
    //   from: address,
    //   maxFeePerGas: MAX_FEE_PER_GAS,
    //   maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    // }
    
    const res1 = await wallet?.sendTransaction({
      data: methodParameters.calldata as `0x${string}`,
      to: ROUTER_ADDRESS,
      value:  BigInt(methodParameters.value),
      // maxFeePerGas: BigInt(MAX_FEE_PER_GAS),
      // maxPriorityFeePerGas: BigInt(MAX_PRIORITY_FEE_PER_GAS),
    });
    
    // const res = await sendTransactionAsync({
    //   data: methodParameters.calldata as `0x${string}`,
    //   to: ROUTER_ADDRESS,
    //   value:  BigInt(methodParameters.value),
    //   maxFeePerGas: BigInt(MAX_FEE_PER_GAS),
    //   maxPriorityFeePerGas: BigInt(MAX_PRIORITY_FEE_PER_GAS),
    // });
    let transactionReceipt = await waitForTransactionReceipt(config, {
      hash: res1 as `0x${string}`,
      pollingInterval: 1_000, 
    });

    return transactionReceipt;

    // const router = new AlphaRouter({
    //   chainId,
    //   provider:provider,
    // });
    // const options: SwapOptionsSwapRouter02 = {
    //   recipient: address as Address,
    //   slippageTolerance: new Percent(50, 10_000),
    //   deadline: Math.floor(Date.now() / 1000 + 1800),
    //   type: SwapType.SWAP_ROUTER_02,
    // };
    // const route = await router.route(
    //   CurrencyAmount.fromRawAmount(
    //     tokenA,
    //     parsedAmount.toString()
    //   ),
    //   tokenB,
    //   TradeType.EXACT_INPUT,
    //   options
    // );

    // if (!route || !route.methodParameters) {
    //   message.warning("未找到swap 路由");
    //   return "";
    // }

    // const txRes = sendTransaction({
    //   data: route.methodParameters.calldata as `0x${string}`,
    //   to: ROUTER_ADDRESS,
    //   value: BigInt(route.methodParameters.value),
    //   // maxFeePerGas: MAX_FEE_PER_GAS,
    //   // maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    // })
    // return txRes;
  };

  const getQuote = async (amount: number) => {
    if(amount<=0){
      return "0";
    }
    // const address2 = await baseContract.getPool(fromTokenAddress, toTokenAddress, 3000);
    // console.log(address2);
    console.log(poolAddress);
    // const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()]);
    const poolContract = new Contract(poolAddress, IUniswapV3PoolABI.abi, provider);
    const [token0, token1, fee, liquidity, slot0] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);
    // const pool = new Pool(
    //   token0,
    //   token1,
    //   fee,
    //   slot0[0].toString(),
    //   liquidity.toString(),
    //   slot0[1]
    // );

    // const outputAmount = amount * parseFloat(pool.token1Price.toFixed(2));
    // return outputAmount;
    const quoterContract = new ethers.Contract(
      QUOTER_CONTRACT_ADDRESS,
      QuoterV2.abi,
      provider
    );
    const input = parseUnits(
      amount.toString(),
      fromTokenDecimal
    ).toString();
    const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
      {
        tokenIn:fromTokenAddress,
        tokenOut:toTokenAddress,
        fee,
        amountIn:input,
        sqrtPriceLimitX96:0
      }
    )
    return formatUnits(quotedAmountOut[0], toTokenDecimal);
  };

  const getPoolImmutables = async () => {
    // const address = await baseContract.getPool(fromTokenAddress, toTokenAddress, 3000);
    const poolContract = new Contract(poolAddress, IUniswapV3PoolABI.abi,provider);
    const [token0, token1, fee] = await Promise.all([poolContract.token0(), poolContract.token1(), poolContract.fee()]);
    const immutables: Immutables = {
      token0,
      token1,
      fee
    };
    return immutables;
  };

  const getPoolState = async () => {
    // const address = await baseContract.getPool(fromTokenAddress, toTokenAddress, 3000);
    const poolContract = new Contract(poolAddress, IUniswapV3PoolABI.abi,provider);
    const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()]);
    const PoolState: State = {
      liquidity,
      sqrtPriceX96: BigInt(slot[0]),
      tick: slot[1]
    };

    return PoolState;
  };

  return { swap, getQuote };
};

export default useSwap;
