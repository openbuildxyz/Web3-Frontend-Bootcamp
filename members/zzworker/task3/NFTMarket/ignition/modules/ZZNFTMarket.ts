import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { HardhatUserConfig } from "hardhat/config";
import ZZTokenModule from "./ZZToken";


const ZZNFTMarketModule = buildModule("ZZNFTMarketModule", (m) => {

  // 引用 TokenModule
  const { ZZToken } = m.useModule(ZZTokenModule);

  const market = m.contract("ZZNFTMarket", [ZZToken], {
  });

  return { market };
});

export default ZZNFTMarketModule;
