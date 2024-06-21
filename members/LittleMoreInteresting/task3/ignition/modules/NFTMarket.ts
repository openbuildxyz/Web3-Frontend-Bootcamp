import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import data from "../deployments/chain-11155111/deployed_addresses.json"

const NFTMarket = buildModule("NFTMarket", (m) => {
  console.log(data["OBToken#OBToken"]);
  const makret = m.contract("NFTMarket",[data["OBToken#OBToken"]]);

  return { makret };
});

export default NFTMarket;
