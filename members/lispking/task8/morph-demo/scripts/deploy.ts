import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // How long you want to lock the ether, here we set 60s after your deployment
  const unlockTime = currentTimestampInSeconds + 60;

  // Set how much ethers you want to lock, here we set 0.00001 ether
  const lockedAmount = ethers.parseEther("0.00001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
