import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ZZTokenModule = buildModule("ZZTokenModule", (m) => {

  const initSupply = 100_000_000;
  const ZZToken = m.contract("ZZToken", [initSupply]);

  return { ZZToken };
});

export default ZZTokenModule;
