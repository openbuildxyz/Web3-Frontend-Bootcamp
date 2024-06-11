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

```bash
NETWORK=sepolia yarn deploy
```


- Contract MyToken deployed successfully: [0xe60fA1906D5933b02aF5a6E8e48a532B33e4d6CF](https://sepolia.etherscan.io/address/0xe60fA1906D5933b02aF5a6E8e48a532B33e4d6CF)
- Contract MyNFT deployed successfully: [0x6D9B714Cb84a028930faC58533a8b9D2aB1b37C0](https://sepolia.etherscan.io/address/0x6D9B714Cb84a028930faC58533a8b9D2aB1b37C0)
- Contract NFTMarket deployed successfully: [0x8BCf073bbcc9A3129ba0ad9e83cbbc67cb8a5b0e](https://sepolia.etherscan.io/address/0x8BCf073bbcc9A3129ba0ad9e83cbbc67cb8a5b0e)
- 购买NFT的交易哈希: [0x10a4d5fb9991475760c397d524343caa3967d4e06a70ff02cb68c1474aae9d16](https://sepolia.etherscan.io/tx/0x10a4d5fb9991475760c397d524343caa3967d4e06a70ff02cb68c1474aae9d16)

