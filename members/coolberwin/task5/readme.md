# Web3 训练营 

task5 任务：task4 的基础上，完善 NFT 市场

## 对比 task4
- 添加 下架 操作  
- 更新 钱包无法 购买自己 list 的 NFT
- 新增 相关合约文件

## 相关tx

| |哈希值链接     | 说明          |
|------------|------------|---------------|
| 上架操作1 |[0x6b0ed617511adf7a1cffb7faaa964356b2905a56f0b3b89066acb96009ade6a4](https://sepolia.etherscan.io/tx/0x6b0ed617511adf7a1cffb7faaa964356b2905a56f0b3b89066acb96009ade6a4)| approve NFT to market|
| 上架操作1 |[0x7e588624616256060b1060d88bb5a22c0df8b5a0eb652cc40e1466d2f15819c6](https://sepolia.etherscan.io/tx/0x7e588624616256060b1060d88bb5a22c0df8b5a0eb652cc40e1466d2f15819c6) | NFT from wallet transfer to market  |
| 购买操作1 |[0xac007f1a709e1d4400250dfbd98c1cba74fd6cb2cbf24c45534cd34b0c811be4](https://sepolia.etherscan.io/tx/0xac007f1a709e1d4400250dfbd98c1cba74fd6cb2cbf24c45534cd34b0c811be4) | approve token to market  |
| 购买操作2 |[0x193956e2015a268bfc2bbada5b6afabd01f02b464c90dc91e50e5c5be849838d](https://sepolia.etherscan.io/tx/0x193956e2015a268bfc2bbada5b6afabd01f02b464c90dc91e50e5c5be849838d) | NFT from market transfer to buyer & token  from buyer transfer to seller|
| 下架操作 |[0x8965f227fd3ca55abb638ec687c16ed8fa0c4c92acf6b02f766a8392ec261c18](https://sepolia.etherscan.io/tx/0x8965f227fd3ca55abb638ec687c16ed8fa0c4c92acf6b02f766a8392ec261c18) | NFT from market transfer to wallet  |



## 关键截图

### 1 展示NFTMarket详细信息

NFT信息包括（价格、上架时间、拥有者, 合约地址）

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task5/members/coolberwin/task5/img/NFT%E8%AF%A6%E7%BB%86%E4%BF%A1%E6%81%AF%E5%B1%95%E7%A4%BA.png?raw=true)

### 2 上架 nft

批准 market 合约 允许 使用 nft

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT1.png?raw=true)

将 nft 转移到 market 合约
![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT2.png?raw=true)

显示 nft 上架已经上架

![图片3](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E4%B8%8A%E6%9E%B6NFT3.png?raw=true)



### 3 购买 nft

购买者 approve bertoken 合约 允许 market 合约 使用自己的 token

![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE1.png?raw=true)

购买者购买 nft,  nft 从 market合约 转移 到钱包地址

![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE2.png?raw=true)

购买后出现在 mynfts 列表

![图片3](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task4/members/coolberwin/task4/img/%E8%B4%AD%E4%B9%B0%E6%88%AA%E5%9B%BE3.png?raw=true)

### 4 下架 nft

owner === address 才可以操作下架
![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task5/members/coolberwin/task5/img/%E5%8F%96%E6%B6%88%E4%B8%8A%E6%9E%B61.png?raw=true)

下架 nft, nft 从 market合约 转移 到钱包地址
![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task5/members/coolberwin/task5/img/%E5%8F%96%E6%B6%88%E4%B8%8A%E6%9E%B62.png?raw=true)

弹出信息 nft 下架成功

![图片3](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task5/members/coolberwin/task5/img/%E5%8F%96%E6%B6%88%E4%B8%8A%E6%9E%B63.png?raw=true)

下架NFT回到 mynfts 列表


![图片4](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task5/members/coolberwin/task5/img/%E5%8F%96%E6%B6%88%E4%B8%8A%E6%9E%B64.png?raw=true)

## 结束task5

---