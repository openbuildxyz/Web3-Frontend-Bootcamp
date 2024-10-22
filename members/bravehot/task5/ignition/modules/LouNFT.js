const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BASE_URI = "black-many-mandrill-971.mypinata.cloud";

module.exports = buildModule("LouNFTModule", (m) => {
  const baseURI = m.getParameter("baseURI", BASE_URI);

  const LouNFT = m.contract("LouNFT", [baseURI]);

  return { LouNFT };
});
