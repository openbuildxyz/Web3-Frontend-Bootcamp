import React, { useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { ethers } from 'ethers';

// 你的 ERC-20 合约地址
const berTokenAddress = '0x9ac13a3d539e2584ff7246aa93b5c6a4bc17e44b';

// ERC-20 ABI，仅包含 balanceOf 方法
const erc20Abi = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "type": "function"
  }
];



const BalanceToken = ({ address }) => {
  const { data: balance, isError, isLoading } = useReadContract({
    address: berTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,  // 可选：监听数据变化
  });

  let formattedBalance;
  useEffect(() => {
    // console.log('formattedBalance', formattedBalance);
},[formattedBalance])
  if (isLoading) {
    formattedBalance = 'Loading...';
  } else if (isError) {
    formattedBalance = 'Error fetching balance';
  } else if (balance) {
    // 将 BigInt 类型的余额从最小单位转换为可读格式
    formattedBalance = ethers.utils.formatEther(balance); // 假设 token 有 18 个小数位
  } else {
    formattedBalance = '0'; // 默认显示0
  }

  return (
    <div>
      berToken 余额: {formattedBalance}
    </div>
  );
}

export default BalanceToken;
