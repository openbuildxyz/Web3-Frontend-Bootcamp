// deploy: npx hardhat ignition deploy ignition/modules/NFT.ts --network sepolia --deployment-id sepolia-NFT
// verify: npx hardhat ignition verify sepolia-NFT --include-unrelated-contracts

// address: 0x1a6370F290A81428249D5e914d363D56bB246ebe

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTModule = buildModule("NFTModule", (m) => {
  const NFT = m.contract("NFT");

  return { NFT };
});

export default NFTModule;
