import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("ERC20TokenModule", (m) => {
  const erc20token = m.contract("ERC20Token", ["myErc20", "¥", 1000]);
  return { erc20token };
});
