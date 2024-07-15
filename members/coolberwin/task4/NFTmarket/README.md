# task4: 利用 wagmi 和 ethers.js 创建 NFT 市场

```
@Author coolberwin
Date 2024/07/13
```

## 相关依赖
```
├── @rainbow-me/rainbowkit@2.1.3
├── @tanstack/react-query@5.45.1
├── @types/node@20.14.10
├── @types/react-dom@18.3.0
├── @types/react@18.3.3
├── @wagmi/cli@2.1.15
├── bufferutil@4.0.8
├── encoding@0.1.13
├── lokijs@1.5.12
├── next@14.2.4
├── pino-pretty@10.3.1
├── react-dom@18.3.1
├── react@18.3.1
├── supports-color@9.4.0
├── typescript@5.5.3
├── utf-8-validate@5.0.10
├── viem@2.17.3
└── wagmi@2.10.10
```

## 结构概述

- page.tsx  整体界面
- providers.tsx  添加 rainbow钱包组件
- components
  - AccountNFT.tsx   Address钱包 NFT 展示上架
  - BalanceToken.tsx Address钱包 token 余额
  - NFTOrderList.tsx NFT 上架列表 展示
- config
  - Marketabi.tsx  NFT Market 合约 abi
  - NFTabi.tsx  NFT 合约 abi
  - Tokenabi.tsx  Token 合约 abi

# 相关合约

| 文件名      | Sepolia 地址 | 说明                 |
|-------------|--------------|----------------------|
| berNewToken.sol   | 0x9ac13a3d539e2584ff7246aa93b5c6a4bc17e44b | ERC-20 代币 |
| berNewNFT.sol  | 0x8f86ab2960f5ed1bab60ddfc2cef8aab3f9b8eec | ERC-721 代币   |
| berNewNFTMarket.sol | 0xeeae464ce594ba0ed9e42f651583767bfed07894 | NFT 市场  |



## 启动程序

> npm run dev


  