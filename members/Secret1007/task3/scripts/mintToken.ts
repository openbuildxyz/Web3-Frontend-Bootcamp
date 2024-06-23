import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0xb903BDB59845d586544D85C984b620bf64eb8683";
  const account = "0x6992663798a664a8cBc3C93b56483C281C1E8438"; // 您的账户地址
  const amount = ethers.parseUnits("100", 18); // 铸造 100 个 Token

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = MyToken.attach(contractAddress);

  const tx = await myToken.mintTo(account, amount);
  console.log("Transaction sent:", tx.hash);

  await tx.wait();
  console.log("Tokens minted successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
