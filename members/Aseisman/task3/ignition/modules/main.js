const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
  const market = m.contract("NFTMarket", ["0x68570484F1373145bF45eb0364cbDE30dd1151D5"]);
  return { market };
});