import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HoraceNFT = buildModule("HoraceNFT", (m) => {
  
  const contract = m.contract("HoraceNFT",["Horace","HOR"]);

  return { contract };
});

export default HoraceNFT;
