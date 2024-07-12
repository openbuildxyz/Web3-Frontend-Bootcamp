const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    morph: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-quicknode-holesky.morphl2.io`),
      network_id: '*',       // Morph network id
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
