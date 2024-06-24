import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("NFTMarket", (m) => {
  const NFTMarket = m.contract("NFTMarket", [
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  ]);
  return { NFTMarket };
});
