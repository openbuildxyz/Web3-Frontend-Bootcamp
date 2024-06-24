import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
module.exports = buildModule("ERC20TokenModule", (m) => {
  const erc20token = m.contract("MTK", [
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  ]);
  return { erc20token };
});
