/* eslint-disable no-undef */
/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.4',
  local: {
    url: 'http://localhost:8545',
  },
  paths: {
    artifacts: './src/backend/artifacts',
    sources: './src/backend/contracts',
    cache: './src/backend/cache',
    tests: './src/backend/test',
  },
};
