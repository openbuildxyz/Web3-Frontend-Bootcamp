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



ERC20合约地址：0xbbc2e5aa4bb60d48f92eafd7f2c5c5b2ed013b19
https://sepolia.etherscan.io/tx/0x89308dbdd79069600d1af8abd27cf37b2a3ed7c1c5b3f322f34ffdc5fde926f1

ERC721合约地址：0x1263192d5e3281ee8bfb38da1050a910d978b997
https://sepolia.etherscan.io/tx/0xd9f97d7b9f88854e15b7860bef294aa73922b0726f9836753b07c262c7a114dd

NFTMarket合约地址：0x337842afe0901bd5089f208e9a31ee1041fb99f4
https://sepolia.etherscan.io/tx/0x833da1eba253acd9ce1d823612d83b9860f0a30c6e9e691eb7e10c72c8e10008

铸造NFT：
0：https://sepolia.etherscan.io/tx/0xaf9b2c3c3b6adeeb50ac76811db4e35ce92d4d3a766c6e4fa9d3c0a55fe790a2
1：https://sepolia.etherscan.io/tx/0xf475fae957eae4df7e5f3b59fc60b3b3d4aeb43595bc58dac572382e41f7fa90

approve 0NFT：https://sepolia.etherscan.io/tx/0xf19c8dbf23f859766ba92e6c74d48cc7b03cb71a0b1764aacd67a07e5eaffa76

主钱包：0xF05ffC656191cF5091aDEB9Fe92028b1E9afa324
次钱包：0x48d4f08DcD6aB40d97636CE16aeD3df75536e2fE
给次钱包转账50token：https://sepolia.etherscan.io/tx/0x15aa43e7b5089627729926cfedc7ba7714c4d1cf2f53c6dc2b2f496902afbf23
次钱包FT approve：https://sepolia.etherscan.io/tx/0x52fd5d6cacdf5e332da5f60d6f2455a53d881bb0ac1fa299ff6d0723f80815b8


上架NFT交易哈希：0xcd4b82faec7c5f212d5487aeae1dfd3605f5f2066629c77ae5463e994bdfa72b
https://sepolia.etherscan.io/tx/0xcd4b82faec7c5f212d5487aeae1dfd3605f5f2066629c77ae5463e994bdfa72b

购买NFT交易哈希：0x4d03e90199f3d9bc4ced365e2deb4f759ce58787efbc82d6f0347a9e74879cf8
https://sepolia.etherscan.io/tx/0x4d03e90199f3d9bc4ced365e2deb4f759ce58787efbc82d6f0347a9e74879cf8