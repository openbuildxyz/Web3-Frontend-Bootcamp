
import { ethers } from "hardhat";



async function main() {
  const [owner] = await ethers.getSigners();

  // 查询账户余额
  const balance = await owner.provider.getBalance(owner.address);
  
  // 将Wei转换为ETH以便于阅读
  const balanceInEth = ethers.formatEther(balance);

  // 打印账户地址及余额
  console.log(`Deploying contracts with the account: ${owner.address}, Balance: ${balanceInEth} ETH`);


  // 调用函数部署第一个合约
  const LighthouseNftFactory = await ethers.getContractFactory('LighthouseNft', owner);
  const lighthouseNft = await LighthouseNftFactory.deploy("YourNFTName", "NFT");
  // 获取合约地址
  const contractAddress = await lighthouseNft.getAddress();
  // 打印合约地址
  console.log("LighthouseNft contract deployed to:", contractAddress);

  // 调用函数部署第二个合约
  const NftMarketFactory = await ethers.getContractFactory('NftMarket', owner);
  const nftMarket = await NftMarketFactory.deploy();
  const nftMarketContractAddress = await nftMarket.getAddress();
  console.log("NftMarket contract deployed to:", nftMarketContractAddress);

  // 调用函数部署第三个合约  deploy Token Contract
  const TokenFactory = await ethers.getContractFactory('Token', owner);
  const token = await TokenFactory.deploy();
  const tokenContractAddress = await token.getAddress();
  console.log("Token contract deployed to:", tokenContractAddress);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });