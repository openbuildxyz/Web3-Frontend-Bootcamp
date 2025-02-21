const hre = require("hardhat");

async function main() {
  try {
    console.log("开始部署 NFTMarket 合约...");
    
    // 部署市场合约
    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    const market = await NFTMarket.deploy();
    await market.waitForDeployment();
    
    const marketAddress = await market.getAddress();
    console.log("Market deployed to:", marketAddress);

    // 等待几个区块确认
    console.log("等待区块确认...");
    await market.deploymentTransaction().wait(5);

    // 验证合约
    if (network.name !== "hardhat" && network.name !== "localhost") {
      console.log("开始验证合约...");
      try {
        await hre.run("verify:verify", {
          address: marketAddress,
          constructorArguments: [],
          contract: "contracts/NFTMarket.sol:NFTMarket"
        });
        console.log("合约验证成功！");
      } catch (error) {
        if (error.message.includes("Already Verified")) {
          console.log("合约已经验证过了");
        } else {
          console.error("合约验证失败:", error);
        }
      }
    }
  } catch (error) {
    console.error("部署过程出错:", error);
    process.exitCode = 1;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
