const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// module.exports = buildModule("MainModule", (m) => {
//   const ONE_GWEI = 1_000_000_000n;
//   const token = m.contract("ByteDanceToken");
//   const nft = m.contract("BytedanceNFT");
//   const tencentNft = m.contract("TencentNFT");
//   const market = m.contract("NFTMarket", [token]);

//   return { token, market, nft, tencentNft };
// });


module.exports = buildModule("MainModule", (m) => {
  const market = m.contract("NFTMarket", ['0x377997332FEefd076B22AEa8A920869b01Cca005']);

  return { market };
});