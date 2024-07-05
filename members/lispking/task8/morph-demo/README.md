# Morph Contract Deployment Demo

This project demonstrates how to use hardhat to deploy a contract on the Morph Holesky Testnet. This project contains a simple contract that will lock a certain amount of Ether in the deployed contract for a specified amount of time.

## Prerequisites

- Network setup: https://docs.morphl2.io/docs/build-on-morph/build-on-morph/development-setup

## Deploy with Hardhat

### Install Dependencies

If you haven't already, install [nodejs](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install).

```bash
cd contract-deployment-demos/hardhat-demo
yarn install
```
This will install everything you need include hardhat for you.


### Compile

Compile your contract

```bash
yarn compile
```

### Test

This will run the test script in test/Lock.ts

```bash
yarn test
```

### Deploy

 Create a `.env` file following the example `.env.example` in the root directory. Change `PRIVATE_KEY` to your own account private key in the `.env`.

 And Change the network settings in the hardhat.config.ts file with the following information:

   ```javascript
    morphTestnet: {
      url: process.env.MORPH_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
   ```
Then run the following command to deploy the contract on the Morph Holesky Testnet. This will run the deployment script that set the initialing parameters, you can edit the script in scripts/deploy.ts

```bash
yarn deploy:morphTestnet
```

### Verify your contracts on Morph Explorer

To verify your contract through hardhat, you need to add the following Etherscan and Sourcify configs to your hardhat.config.js file:

```javascript
module.exports = {
  networks: {
    morphTestnet: { ... }
  },
  etherscan: {
    apiKey: {
      morphTestnet: 'anything',
    },
    customChains: [
      {
        network: 'morphTestnet',
        chainId: 2810,
        urls: {
          apiURL: 'https://explorer-api-holesky.morphl2.io/api? ',
          browserURL: 'https://explorer-holesky.morphl2.io/',
        },
      },
    ],
  },
};
```
Then run the hardhat verify command to finish the verification

```bash
npx hardhat verify --network morphTestnet DEPLOYED_CONTRACT_ADDRESS <ConstructorParameter>
```

For example

```bash
npx hardhat verify --network morphTestnet 0x8025985e35f1bAFfd661717f66fC5a434417448E '0.00001'
```


Once succeed, you can check your contract and the deployment transaction on [Morph Holesky Explorer](https://explorer-holesky.morphl2.io)
   

## Support

Thank you for participating in and developing on the Morph Holesky Testnet! If you encounter any issues, join our [Discord](https://discord.com/invite/5SmG4yhzVZ) and find us at #dev-help channel.