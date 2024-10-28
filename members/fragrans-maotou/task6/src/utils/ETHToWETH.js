// ETH 给 WETH 兑换
const { ethers } = require('ethers');

// 连接到本地以太坊节点
const provider = new ethers.providers.JsonRpcBatchProvider('http://127.0.0.1:8545');

// WETH 合约地址（替换为你的 WETH 合约地址）
const wethAddress = '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'; // 主网地址或本地链地址

// WETH 合约 ABI
const wethABI = [
  "function deposit() public payable",
  "function withdraw(uint wad) public",
  "function balanceOf(address) public view returns (uint)"
];

// 创建 WETH 合约实例
const wethContract = new ethers.Contract(wethAddress, wethABI, provider.getSigner());
// 将 ETH 转换为 WETH
async function depositETH(amountInEther) {
  const amountInWei = ethers.utils.parseEther(amountInEther);
  const tx = await wethContract.deposit({ value: amountInWei });
  await tx.wait();
  console.log(`Deposited ${amountInEther} ETH as WETH`);
}

// 示例：将 2 ETH 转换为 WETH
depositETH('200');
