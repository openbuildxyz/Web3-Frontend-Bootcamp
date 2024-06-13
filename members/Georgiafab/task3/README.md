## task3 介绍

1. 部署在 Sepolia 测试网上
   ![bind-wallet](./readme/deploy.png "deploy")
2. 提交全部合约文件（ERC20、ERC721、NFTMarket）  
   在 contract 文件夹中，其他文件用来测试的，忽略掉
3. 提交上架 NFT、购买 NFT 的交易哈希  
   提交上架 NFT： 0x754e73598b6b0059510532a5b53dd6068dcd81ac3a7cdf9d2ed5d06b1662562d  
   购买 NFT： 0xf937159ae007f8de3cd163752d66b33a8ad8897926f8e619c9b436c689d864e0

## 环境搭建：

- Hardhat
- react

## 钱包与合约访问

- wagmi
- metamask
- Ethersjs

---

- 编译合约：
  `npx hardhat compile`
- 开启本地网络：
  `npx hardhat node`
- 在本地网络上测试合约：
  `npx hardhat test --network localhost`
- 在本地网络上部署合约：
  `npx hardhat ignition deploy ./ignition/modules/ERC20Token.ts --network localhost`

---

开启前端服务：
`npx run dev`

## 合约

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/NFTMarket.ts
```
