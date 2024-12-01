// deploy: npx hardhat ignition deploy ignition/modules/ERC20Token.ts --network sepolia --deployment-id sepolia-ERC20Token

// address: 0x453E05b31c9A85063f2696Bb4e89B484b4e69580

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const init_Supply: bigint = parseEther("100");

const ERC20TokenModule = buildModule("ERC20TokenModule", (m) => {
  const ERC20Token = m.contract("ERC20Token", [init_Supply]);

  return { ERC20Token };
});

export default ERC20TokenModule;
