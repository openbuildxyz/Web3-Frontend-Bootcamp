import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZZNFTModule = buildModule("ZZNFTModule", (m) => {

  const nft = m.contract("ZZNFT", [], {
  });

  return { nft };
});

export default ZZNFTModule;
