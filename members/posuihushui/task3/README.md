# 编写 NFTMarket 智能合约

## 任务目标
编写一个智能合约，实现一个简单的NFT市场功能，允许用户上架NFT并使用自己部署的ERC20代币进行购买。
## 任务要求
### 1.部署ERC20代币
需要部署一个ERC20代币，用于NFT的购买。

### 2.部署NFT
需要部署NFT用于买卖
https://sepolia.etherscan.io/address/0x3e47268d528641769324c14ca8c834fc06af777f

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
  - npm run deploy
  - [ERC20代币](https://sepolia.etherscan.io/address/0x75473962c5000EFEd2EADB406955e541C07844FF)
  - [ERC721](https://sepolia.etherscan.io/address/0xc7d32a7e1eAd1ff2201E8a56dFb1Ed5b0C46ec0F)
  - [NFTMarket](https://sepolia.etherscan.io/address/0x99b274C6c28d837048c38a6AE3ce102630f2876d)
- 提交全部合约文件（ERC20、ERC721、NFTMarket）
   - contracts/*.sol
- 提交上架NFT、购买NFT的交易哈希
    - [上架](https://sepolia.etherscan.io/tx/0x534e1d83bf899b3ad4bfb59336f07cbcfef4efc164455040f7918e7c66f88d1c)
    - [购买](https://sepolia.etherscan.io/tx/0x5dcd5a56267c0ce1a3b44dfc11d4055aaac615eda4c622bc95474b61c353ef8f)


