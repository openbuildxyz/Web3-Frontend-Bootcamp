// import { ethers } from 'ethers';
// import { useAccount, useContract, useProvider, useSigner } from 'wagmi';
import { useReadContract, useReadContracts, useWriteContract, useAccount } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core'
import { sepolia } from 'wagmi/chains';
import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import IUniswapV3PoolArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ISwapRouterArtifact from '@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json';
import IUniswapV3FactoryArtifact from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { erc20Abi, Address } from 'viem';
import { formatUnits, parseUnits } from 'viem'

import useFromToken from './useFromToken';
import { config } from './config';

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

const UNI_FACTORY_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const ROUTER_ADDRESS = '0xE592427A0AEce92De3Edee1F18E0157C05861564';

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

const useSwap = (fromTokenAddress: string, toTokenAddress: string) => {
  // const provider = useProvider();
  const account = useAccount();
  const { address } = useAccount();
  const{data:poolAddress, status} = useReadContract({
    abi: IUniswapV3FactoryArtifact.abi,
    address: UNI_FACTORY_ADDRESS,
    functionName: 'getPool',
    args: [fromTokenAddress, toTokenAddress, 3000],
  });
  
  // let poolAddress = infoResult.data as Address;
  // if(infoResult.status==="success"){
  //   poolAddress = infoResult.data as Address;
  // }
  const { approve } = useFromToken(fromTokenAddress);
  const {writeContractAsync} = useWriteContract()

  const swap = async (amount: number) => {

    await approve(ROUTER_ADDRESS, amount);

    const immutables = await getPoolImmutables();

    const parsedAmount = parseUnits(amount.toString(), TO_TOKEN_DECIMALS);

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
      args: [params.tokenIn, params.tokenOut, immutables.fee, address, Math.floor(Date.now() / 1000) + 60 * 10, parsedAmount, 0, 0]
    });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: routerContractHash,
      pollingInterval: 500, 
    });

    return transactionReceipt;
  };

  const getQuote = async (amount: number) => {
    const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()]);

    const tokenA = new Token(sepolia.id, toTokenAddress, TO_TOKEN_DECIMALS);
    const tokenB = new Token(sepolia.id, fromTokenAddress, FROM_TOKEN_DECIMALS);

    const pool = new Pool(
      tokenA,
      tokenB,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    );

    const outputAmount = amount * parseFloat(pool.token1Price.toFixed(2));
    return outputAmount;
  };

  const { 
    data,
    error:error2,
    isPending:pending2
  }= useReadContracts({
    contracts: [
      {
        address: poolAddress,
        abi: IUniswapV3PoolArtifact.abi,
        functionName: 'token0',
      },
      {
        address: poolAddress,
        abi: IUniswapV3PoolArtifact.abi,
        functionName: 'token1',
      },
      {
        address: poolAddress,
        abi: IUniswapV3PoolArtifact.abi,
        functionName: 'fee',
      }
    ]
  });
  const [token0, token1, fee] = data || [];

  // let token0:Address, token1:Address, fees:number;
  // const token0Read = useReadContract({
  //   address: poolAddress,
  //   abi: IUniswapV3PoolArtifact.abi,
  //   functionName: 'token0',
  // });
  // if(token0Read.status==="success"){
  //   token0 = token0Read.data as Address;
  // }
  // const token1Read = useReadContract({
  //   address: poolAddress,
  //   abi: IUniswapV3PoolArtifact.abi,
  //   functionName: 'token1',
  // });
  // if(token1Read.status==="success"){
  //   token1 = token1Read.data as Address;
  // }
  // const feeRead = useReadContract({
  //   address: poolAddress,
  //   abi: IUniswapV3PoolArtifact.abi,
  //   functionName: 'fee',
  // });

  const getPoolImmutables = async () => {
    // if (!poolAddress) throw new Error('Pool contract has not been initialized');
    // if(feeRead.status==="success"){
    //   fee = feeRead.data as number;
    // }
    await waitForCondition(()=>{return status==="success";}, 3000);
    await waitForCondition(()=>{return pending2==false;},5000);
    if(!pending2||error2){
      throw new Error('Pool contract has not been initialized');
    }
    
    // const [token0, token1, fee] = await Promise.all([poolContract.token0(), poolContract.token1(), poolContract.fee()]);
    // if (!token0||!token1||!fee) throw new Error('Pool contract has not been initialized');
    const immutables: Immutables = {
      token0,
      token1,
      fee
    };
    return immutables;
  };

  const { 
    data:data3,
    error:error3,
    isPending:pending3
  }= useReadContracts({
    contracts: [
      {
        address: poolAddress,
        abi: IUniswapV3PoolArtifact.abi,
        functionName: 'liquidity',
      },
      {
        address: poolAddress,
        abi: IUniswapV3PoolArtifact.abi,
        functionName: 'slot0',
      }
    ]
  });
  const [liquidity, slot0] = data || [];
  // let liquidity:bigint, slot0:Array<number>;
  // const liquidityRead = useReadContract({
  //   address: poolAddress,
  //   abi: IUniswapV3PoolArtifact.abi,
  //   functionName: 'liquidity',
  // });
  // if(liquidityRead.status==="success"){
  //   liquidity = liquidityRead.data as bigint;
  // }
  // const slot0Read = useReadContract({
  //   address: poolAddress,
  //   abi: IUniswapV3PoolArtifact.abi,
  //   functionName: 'slot0',
  // });
  // if(slot0Read.status==="success"){
  //   slot0 = slot0Read.data as Array<number>;
  // }
  const getPoolState = async () => {
    // if (!poolAddress) throw new Error('Pool contract has not been initialized');
    // if(!liquidity||!slot0) throw new Error('Pool contract has not been initialized');
    await waitForCondition(()=>{return status==="success";}, 3000);
    await waitForCondition(()=>{return pending2==false;},5000);
    if(!pending2||error2){
      throw new Error('Pool contract has not been initialized');
    }
    
    const PoolState: State = {
      liquidity,
      sqrtPriceX96: BigInt(slot0[0]),
      tick: slot0[1]
    };

    return PoolState;
  };

  return { swap, getQuote };
};

export default useSwap;
