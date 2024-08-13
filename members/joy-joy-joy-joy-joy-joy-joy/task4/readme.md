本项目需要安装pnpm解决依赖冲突。
运行本项目：
npm install pnpm
pnpm install
pnpm run dev

# 项目展示

## 未连接钱包时
![](https://img.picui.cn/free/2024/06/30/66806e5d0a2ae.png)
## 连接钱包
![](https://img.picui.cn/free/2024/06/30/66806ec61b1d8.png)
![](https://img.picui.cn/free/2024/06/30/66806ef9a7163.png)
## 挂单
### 授权以及等待授权后挂单
在list按键按下后，调用approve，监听到approve交易完成后，自动调用list,监听list事件触发，随后通过更新listings列表，再更新界面显示上架的nft信息
![](https://img.picui.cn/free/2024/06/30/66806f6a40517.png)
![](https://img.picui.cn/free/2024/06/30/6680700bc7212.png)
### 挂单完成
![](https://img.picui.cn/free/2024/06/30/668070946a687.png)
## 购买
### 授权以及等待授权后购买
![](https://img.picui.cn/free/2024/06/30/668070fabee8d.png)
![](https://img.picui.cn/free/2024/06/30/668071528c26f.png)
### 购买完成
![](https://img.picui.cn/free/2024/06/30/668071846febd.png)