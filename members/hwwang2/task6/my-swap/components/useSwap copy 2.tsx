import { ethers, Contract } from 'ethers';
// import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { useReadContract, useReadContracts, useWriteContract, useAccount, useChainId } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'
import { sepolia } from 'wagmi/chains';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ISwapRouterArtifact from '@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json';
import IUniswapV3FactoryArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
import { erc20Abi, Address } from 'viem';
import { formatUnits, parseUnits } from 'viem'
import { computePoolAddress,FeeAmount,POOL_INIT_CODE_HASH } from '@uniswap/v3-sdk';

import useFromToken from './useFromToken';
import { config, SEPOLIA_ALCHMY_KEY,UNI_FACTORY_ADDRESS,QUOTER_CONTRACT_ADDRESS,ROUTER_ADDRESS,SELECT_ALCHEMY_NETWORK } from './config';

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

const FROM_TOKEN_DECIMALS = 18;
const TO_TOKEN_DECIMALS = 18;


const provider = new ethers.AlchemyProvider(SELECT_ALCHEMY_NETWORK,SEPOLIA_ALCHMY_KEY);
// const provider = ethers.getDefaultProvider();

function waitForCondition(conditionFunc:()=>boolean, timeout:number) {
  // 创建一个Promise，它将在timeout后拒绝
  let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Condition not met within timeout')), timeout);
  });
 
  // 每5秒检查一次条件
  let checkInterval = setInterval(() => {
    let conditionMet = conditionFunc(); // 调用条件函数
    if (conditionMet) {
      // 条件满足，清除间隔并解决Promise
      clearInterval(checkInterval);
      console.log('Condition met');
    }
  }, 500);
 
  // 返回一个Promise，它将在条件满足时解决，或在超时时拒绝
  return Promise.race([timeoutPromise, new Promise(resolve => checkInterval)]);
}

const useSwap = (fromTokenAddress: string, toTokenAddress: string,fromTokenDecimal: number, toTokenDecimal: number) => {
  // const provider = useProvider();
  const chainId = useChainId();
  const { address } = useAccount();
  const baseContract = new Contract(UNI_FACTORY_ADDRESS, IUniswapV3FactoryArtifact.abi, provider)
  
  const tokenA = new Token(chainId, fromTokenAddress, fromTokenDecimal);
  const tokenB = new Token(chainId, toTokenAddress, toTokenDecimal);
  const poolAddress = computePoolAddress({
    factoryAddress: UNI_FACTORY_ADDRESS,
    tokenA, 
    tokenB,
    fee: FeeAmount.MEDIUM,
    chainId,
    initCodeHashManualOverride:POOL_INIT_CODE_HASH
  });
  
  const { approve } = useFromToken(fromTokenAddress);
  const {writeContractAsync} = useWriteContract()

  const swap = async (amount: number|string) => {
    const immutables = await getPoolImmutables();
    const parsedAmount = parseUnits(amount.toString(), FROM_TOKEN_DECIMALS);
    await approve(ROUTER_ADDRESS, amount);
    const params = {
      tokenIn: fromTokenAddress,
      tokenOut: toTokenAddress,
      fee: immutables.fee,
      recipient: address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      amountIn: parsedAmount,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0
    };

    const routerContractHash = await writeContractAsync({
      address: ROUTER_ADDRESS,
      abi: ISwapRouterArtifact.abi,
      functionName: "exactInputSingle",
      // args: [params.tokenIn, params.tokenOut, immutables.fee, address, Math.floor(Date.now() / 1000) + 60 * 10, parsedAmount, 0, 0]
      args: [params]
    });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: routerContractHash,
      pollingInterval: 500, 
    });

    return transactionReceipt;
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
    ])
    // const pool = new Pool(
    //   token0,
    //   token1,
    //   fee,
    //   slot0[0],
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
