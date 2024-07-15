# Web3 训练营

task4 任务：利用 wagmi 和 ethers.js 创建 NFT 市场

## 任务概述

```
使用ethers.js和wagmi与NFTMarket合约交互
任务目标

使用ethers.js和wagmi库编写一个前端应用程序，允许用户上架NFT并使用ERC20代币购买NFT。
前端组件要求

    连接钱包：用户可以通过MetaMask连接他们的钱包。
    上架NFT：用户选择NFT设置价格上架到市场。
    显示上架的NFT：显示所有上架的NFT，包括NFT的合约地址、Token ID、价格和卖家地址。
    购买NFT：用户可以选择一个上架的NFT并使用ERC20代币进行购买。

提交要求

    提交完整代码
    提交界面截图

```

## 关键截图

### 1 上架 nft

批准 market 合约 允许 使用 nft

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT1.png?raw=true)

将 nft 转移到 market 合约
![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT2.png?raw=true)

显示 nft 上架已经上架

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT3.png?raw=true)



### 2 购买 nft

购买者 approve bertoken 合约 允许 market 合约 使用自己的 token

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE1.png?raw=true)

购买者购买 nft,  nft 从 market合约 转移 到钱包地址

![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE2.png?raw=true)

购买后出现在 mynfts 列表

![图片3](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE3.png?raw=true)