import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OBToken = buildModule("OBToken", (m) => {
  
  const contract = m.contract("OBToken");

  return { contract };
});

export default OBToken;
