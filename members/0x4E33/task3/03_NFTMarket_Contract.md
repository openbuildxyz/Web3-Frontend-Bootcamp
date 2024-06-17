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



ERC20合约地址：0xF37F3Fe720Ed8eD6d7f6Bdf5356A556E492E3c0c

ERC721合约地址：0x77db7eB48aA381541291A18CeCF716A2F8e073d6

NFTMarket合约地址：0x509D999D33027eeaF69c865f71785e5bDd774161



MINT合约交易哈希：0x9d52851686d09d48f267b6fccc914cf07e8d84a18b8632652f02614ab4cf5d6b

上架NFT交易哈希：0x7fc4897987966b0298420dec3a21d0eab9496560a0b28ff6895c31ced6dbcd36

购买NFT交易哈希：0x4e01a8761ada1625cc3325e6e0820997d76cb0e5253fa82276e51d7f05f45a38
