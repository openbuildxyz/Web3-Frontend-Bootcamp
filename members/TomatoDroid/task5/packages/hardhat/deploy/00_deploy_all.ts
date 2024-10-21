import { Contract } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployAll: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  const { deploy } = hre.deployments;

  const TomatoTokenContract = await deploy("TomatoToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("TomatoNFT", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  await deploy("NFTExchange", {
    from: deployer,
    args: [TomatoTokenContract.address],
    log: true,
    autoMine: true,
  });

  const address1 = "0x086aA16D21D3deBD8959570db68f7a62082c7b80";
  const address2 = "0xd13Cc3967B61483abb0B1187883c60E4A0a61AB8";

  const tomatoTokenContract = await hre.ethers.getContract<Contract>("TomatoToken", deployer);
  await tomatoTokenContract.transfer(address1, 50_000000000n);
  await tomatoTokenContract.transfer(address2, 50_000000000n);
  console.log("👋 success");
};

export default deployAll;

deployAll.tags = ["AllContract"];
