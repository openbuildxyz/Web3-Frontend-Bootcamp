# 部署 nft

Compiled 1 Solidity file successfully (evm target: paris).
Deploying contracts with the account: 0xF69618C9c30AF9d8deAD34d3Db2570ed177308B7, Balance: 0.542315375888570146 ETH
LighthouseNft contract deployed to: 0xDB1964AbCB41Cac54dA8B317461fD0D781a9b90F
NftMarket contract deployed to: 0x58f0D901d1aE9EA65790eb7c31Bfac7B8b786DcE

# hardhat 部署等

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# 部署账号

`npx hardhat run scripts/deploy.ts --network sepolia`
