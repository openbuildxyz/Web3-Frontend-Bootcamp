import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("ERC721TokenModule", (m) => {
  const ERC721Token = m.contract("MILKNT");
  return { ERC721Token };
});
