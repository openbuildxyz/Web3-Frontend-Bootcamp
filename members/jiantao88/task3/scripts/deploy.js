async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyERC20Token = await ethers.getContractFactory("MyERC20Token");
  const myERC20Token = await MyERC20Token.deploy();
  await myERC20Token.deployed();
  console.log("MyERC20Token deployed to:", myERC20Token.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();
  console.log("MyNFT deployed to:", myNFT.address);

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy(myERC20Token.address);
  await nftMarket.deployed();
  console.log("NFTMarket deployed to:", nftMarket.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
