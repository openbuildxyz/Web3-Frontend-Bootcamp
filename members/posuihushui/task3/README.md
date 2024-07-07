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
  - [ERC20代币](https://sepolia.etherscan.io/address/0xd9fB4C6587b2d7312a2542F1213c1e9CA93B88Df)
  - [ERC721](https://sepolia.etherscan.io/address/0x3dBe0B68eaC8888F9508959685FF0D74a6E712E7)
  - [NFTMarket](https://sepolia.etherscan.io/address/0x682ce468Bd59c23CA730d83aBDa540B677A5052F)
- 提交全部合约文件（ERC20、ERC721、NFTMarket）
   - contracts/*.sol
- 提交上架NFT、购买NFT的交易哈希
    - [上架](https://sepolia.etherscan.io/tx/0x4bd40e15a8f6f06e7c66d2bcf7a3b0a07fd75467f124ff32168ab8e03942a9b3)
    - [购买](https://sepolia.etherscan.io/tx/0x98b5efccc00b865cb78002f0031d1c618fe77fe426eaaa39d4efcce16a093399)(revert了，why?)


