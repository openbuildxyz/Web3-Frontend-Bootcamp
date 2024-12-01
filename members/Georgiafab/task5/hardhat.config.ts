import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    // artifacts: "./src/artifacts", // 让编译完的合约直接在src目录下方便前端使用
  },
};

export default config;

// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
//   paths: {
//     artifacts: "./src/artifacts",
//   },
// };
