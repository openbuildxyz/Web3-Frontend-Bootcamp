const { ethers } = require('ethers');

// 连接到本地以太坊节点
const provider = new ethers.providers.JsonRpcBatchProvider('http://127.0.0.1:8545');

// factory合约地址
const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'; // 主网地址或本地链地址
const WETH9Address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

// WETH 合约 ABI
const wethABI = [
  "function approve(address spender, uint amount) public returns (bool)",
  "function balanceOf(address owner) public view returns (uint)"
];

// 创建 合约实例
const ETHContract = new ethers.Contract(WETH9Address, wethABI, provider.getSigner());


// 将 ETH 转换为 WETH
async function approveETH(approveAmountIn) {
  const amountIn = ethers.utils.parseEther(approveAmountIn,18);
  const tx = await ETHContract.approve( factoryAddress, amountIn );
  await tx.wait();
  console.log(`Deposited ${amountIn} ETH as WETH`);
}

// 示例：将 2 ETH 转换为 WETH
approveETH('20');
