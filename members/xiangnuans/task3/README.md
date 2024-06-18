# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```


# 编写 NFTMarket 智能合约

## 任务目标
编写一个智能合约，实现一个简单的NFT市场功能，允许用户上架NFT并使用自己部署的ERC20代币进行购买。
## 任务要求
### 1.部署ERC20代币
需要部署一个ERC20代币，用于NFT的购买。

### 2.部署NFT
需要部署NFT用于买卖

### 3.上架NFT
- 用户可以将自己的NFT上架到市场。
- 上架时需要指定NFT的合约地址、Token ID以及价格（使用ERC20代币）。
- 声明上架NFT事件

### 4.购买NFT
- 用户可以使用自己部署的ERC20代币购买上架的NFT。
- 购买成功后，NFT转移给买家，卖家收到ERC20代币。
- 声明购买NFT事件

## 提交要求
- 部署在Sepolia测试网上
- 提交全部合约文件（ERC20、ERC721、NFTMarket）
- 提交上架NFT、购买NFT的交易哈希


- Contract MyToken deployed successfully: [0xC2F6FE1FCb070abE231CA0f9c2d148183740E4a8](https://sepolia.etherscan.io/address/0xC2F6FE1FCb070abE231CA0f9c2d148183740E4a8)
- Contract MyNFT deployed successfully: [0x4ECEd2DEAfC38a647675F650c8ee0abbc52Db26e](https://sepolia.etherscan.io/address/0x4ECEd2DEAfC38a647675F650c8ee0abbc52Db26e)
- Contract NFTMarket deployed successfully: [0x53b72dE55e80B4569EfDA5C96393b26FBDd27eF8](https://sepolia.etherscan.io/address/0x53b72dE55e80B4569EfDA5C96393b26FBDd27eF8)
- Purchase NFT's transaction hash: [0xf87b7bbf97f47920944c4941fa087703c0f3f10876431f05b7de50d9b9bc6e93](https://sepolia.etherscan.io/tx/0xf87b7bbf97f47920944c4941fa087703c0f3f10876431f05b7de50d9b9bc6e93)