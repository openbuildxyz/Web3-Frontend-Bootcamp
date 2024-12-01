// deploy: npx hardhat ignition deploy ignition/modules/NFTMarket.ts --network sepolia --deployment-id sepolia-NFTMarket
// verify: npx hardhat ignition verify sepolia-NFTMarket --include-unrelated-contracts

// address: 0xa80A300D5f37409c71E239C6013b7A180877D7e4

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ERC20Token_Module from './ERC20Token';


const NFTMarketModule = buildModule("NFTMarketModule", (m) => {
  const { ERC20Token } = m.useModule(ERC20Token_Module);
  const NFTMarket = m.contract("NFTMarket", [ERC20Token]);

  return { NFTMarket };
});

export default NFTMarketModule;
