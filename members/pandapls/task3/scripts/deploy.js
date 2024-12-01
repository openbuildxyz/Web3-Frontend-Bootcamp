const hre = require("hardhat");

async function main() {
  console.log('deploy start --->');
  // 获取合约部署者的地址
  const [deployer] = await ethers.getSigners();
  // 获取部署者的 ETH 余额
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Deployer's balance: ${ethers.formatEther(balance)} ETH`);
  // 部署erc20 代币合约
  const myTokenFactory = await hre.ethers.getContractFactory('MyToken');
  const myToken = await myTokenFactory.deploy(ethers.parseEther('1'));
  const myTokenAddress = await myToken.target;
  await verify(myTokenAddress, [ethers.parseEther('1')])
  console.log(`MyToken deployed to: ${myTokenAddress}`);

  // 部署NFT token合约
  const myNFTTokenFactory = await ethers.getContractFactory('MyNFTToken');
  const myNFTToken = await myNFTTokenFactory.deploy();
  const myNFTTokenAddress = await myNFTToken.getAddress();
  await verify(myNFTTokenAddress, [])
  console.log(`MyNFTToken deployed to: ${myNFTTokenAddress}`);

  // 部署NFTMarket合约
  const NFTMarketFactory = await ethers.getContractFactory('NFTMarket');
  const NFTMarket = await NFTMarketFactory.deploy(myTokenAddress);
  const NFTMarketAddress = await NFTMarket.getAddress();
  await verify(myNFTTokenAddress, [myTokenAddress])
  console.log(`NFTMarket deployed to: ${NFTMarketAddress}`);

  console.log('<---- deploy end ');
}
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgsParams: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}
// 运行部署脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
