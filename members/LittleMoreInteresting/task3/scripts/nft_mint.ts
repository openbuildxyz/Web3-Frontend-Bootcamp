import hre from "hardhat";
import * as dotenv from "dotenv";
import data from '../ignition/deployments/chain-11155111/deployed_addresses.json'
dotenv.config();
const { API_URL, PRIVATE_KEY,ACCOUNT_A,ACCOUNT_B } = process.env;
async function main() {
  const use1 = await hre.ethers.getSigner(ACCOUNT_A as string);
  const use2 = await hre.ethers.getSigner(ACCOUNT_B as string);
  const HoraceNFT = await hre.ethers.getContractFactory("HoraceNFT");
  const nft = HoraceNFT.attach(data["HoraceNFT#HoraceNFT"])
  try {
    const tx1 = await nft.connect(use1).getFunction("mintNft")()
    console.log(tx1)
    const tx2 = await nft.connect(use1).getFunction("mintNft")()
    console.log(tx2)
  } catch (error) {
    console.log(error)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});