import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarket = buildModule("NFTMarket", (m) => {
  
  const makret = m.contract("NFTMarket");

  return { makret };
});

export default NFTMarket;
