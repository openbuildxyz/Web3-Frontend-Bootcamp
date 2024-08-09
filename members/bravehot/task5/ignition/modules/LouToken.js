const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LouTokenModule", (m) => {
  const LouToken = m.contract("LouToken");

  return { LouToken };
});
