# Web3 训练营 

task6 任务：制作一个与uniswap交互的前端app

# 任务要求

```
制作一个与uniswap交互的前端app
任务目标

根据视频学习uniswap、sdk相关知识，制作一个与uniswap交互的前端app
提交要求

    提交全部代码
    提交界面截图
    提交swap操作的截图
    (选做）：提交添加流动性、移除流动性相关操作的截图

```

## 相关信息

参考老师的 [github 前端代码](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/tree/main/slides/6.%E5%AE%9E%E6%88%98%E9%A1%B9%E7%9B%AE%E4%BA%8C%EF%BC%9AUniswap%E5%AE%9E%E6%88%98)

### 合约信息

参考 [uniswap v2-deployments](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments)

| Network           | Factory Contract Address                       | V2Router02 Contract Address                       |
|-------------------|-------------------------------------------------|---------------------------------------------------|
| Mainnet           | 0x5C69bEe701ef814a2B6a3EDD4B1652C89c5aA6f       | 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D       |
| Ethereum Sepolia  | 0xB7f907f7A9eBC822a80BD25E224b4e42Ce0A698A0     | 0x425141165d3DE9FEC831896C016617a52363b687       |
| Arbitrum          | 0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9      | 0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24       |
| Avalanche         | 0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C      | 0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24       |
| BNB Chain         | 0x8909Dc15e40173Ff469943b6eB8132c65e18eC6       | 0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24       |
| Base              | 0x8909Dc15e40173Ff469943b6eB8132c65e18eC6       | 0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24       |
| Optimism          | 0x0c3c1c532F1e39EdF36BE9Fe0bE1410313E074Bf      | 0xA47b5Da61326A6379179b40d0F57E5bbDC962c2        |
| Polygon           | 0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C      | 0xedf6066a2b290C1857838627CF4776A2C8077AD1       |
| Blast             | 0x5C34646d33F90bABa7d0D6388507C889C1070        | 0xBB66Eb1c5e875933D44Ae661dbD8e5D9B03035         |

## 一些改动

- 增加自动设置 slipper (虽然不好看)
- 删除多余 链 只保留 mainnet 和 base
- 删除 多余代币 只保留 weth 和 usdc
- 更改resource.js中 mainnet 和 base 的rpc 

## 关键截图



### 1. 主界面


![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task6/members/coolberwin/task6/img/swap%E6%88%AA%E5%9B%BE1%20%E7%95%8C%E9%9D%A2.png?raw=true)

### 2. 自定义滑点

![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task6/members/coolberwin/task6/img/swap%E6%88%AA%E5%9B%BE2%20%E8%87%AA%E5%AE%9A%E4%B9%89slippage.png?raw=true)

### 3. 交易approve

![图片3](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task6/members/coolberwin/task6/img/swap%E6%88%AA%E5%9B%BE3%20approve.png?raw=true)


由于 wallet 没有代币 就没有做流动性 相关内容

## 结束

---