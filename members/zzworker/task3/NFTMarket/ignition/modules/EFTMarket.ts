import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketModule = buildModule("NFTMarketModule", (m) => {

  const lock = m.contract("NFTMarket", [], {
  });

  return { lock };
});

export default NFTMarketModule;
