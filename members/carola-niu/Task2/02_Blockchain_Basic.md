# Task2 Blockchain Basic

本任务分为简答题、分析题和选择题，以此为模板，在下方填写你的答案即可。

选择题，请在你选中的项目中，将 `[ ]` 改为 `[x]` 即可



## [单选题] 如果你莫名奇妙收到了一个 NFT，那么

- [ ] 天上掉米，我应该马上点开他的链接
- [x] 这可能是在对我进行诈骗！



## [单选题] 群里大哥给我发的网站，说能赚大米，我应该

- [ ] 赶紧冲啊，待会米被人抢了
- [x] 谨慎判断，不在不信任的网站链接钱包

## [单选题] 下列说法正确的是

- [] 一个私钥对应一个地址
- [x] 一个私钥对应多个地址
- [ ] 多个私钥对应一个地址
- [ ] 多个私钥对应多个地址

 ## [单选题] 下列哪个是以太坊虚拟机的简称

- [ ] CLR
- [x] EVM
- [ ] JVM

## [单选题] 以下哪个是以太坊上正确的地址格式？

- [ ] 1A4BHoT2sXFuHsyL6bnTcD1m6AP9C5uyT1
- [ ] TEEuMMSc6zPJD36gfjBAR2GmqT6Tu1Rcut
- [ ] 0x997fd71a4cf5d214009619808176b947aec122890a7fcee02e78e329596c94ba
- [x] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      
## [多选题] 有一天某个大哥说要按市场价的 80% 出油给你，有可能

- [x] 他在洗米
- [ ] 他良心发现
- [x] 要给我黒米
- [x] 给我下套呢

## [多选题] 以下哪些是以太坊的二层扩容方案？

- [ ] Lightning Network（闪电网络）
- [x] Optimsitic Rollup
- [x] Zk Rollup

## [简答题] 简述区块链的网络结构

```
The network structure of a blockchain is decentralized and distributed, consisting of multiple nodes that work together. The basic network uses a peer-to-peer (P2P) protocol. Each node maintains a copy of the entire blockchain, ensuring redundancy and security. Nodes communicate with each other to validate and propagate new transactions and blocks.
To achieve agreement on the state of the blockchain among all nodes, there are also consensus mechanisms which include Proof of Work (PoW)[bitcoin] and Proof of Stake (PoS)[Etherum after merging], among others.
```



## [简答题] 智能合约是什么，有何作用？

```
A smart contract is a set of functions that can be called by other users or contracts.
They can be used to execute functions, send ether or store data.
Each smart contract is an account holding object.
Once deployed a smart contract, it can be publicly accessible by anyone on the network and cannot
be patched. 
```



## [简答题] 怎么理解大家常说的 `EVM` 这个词汇？

```
Ethereum Virtual Machine(EVM) was the first virtual machine to be placed on a blockchain network, allowing to conduct calculation on the blockchain in runtime. EVM specifies an excuation model for state changes on Ethereum with a stack-based architecture. The running operations on EVM have associated costs denominated in gas.
```



## [分析题] 你对去中心化的理解

```
Decentralization makes every individual have more control and autonomy over their own data and transactions. In a decentralized system, there is no single central authority or intermediary that manages or governs the entire network. Instead, control is distributed among all participants.
```



## [分析题] 比较区块链与传统数据库，你的看法？

```
A Blockchain is a distributed database that maintains a continuosly-growing list of ordered records called blocks. Once recorded, the data in a block cannot be altered retroactively. Instead, any changes require the creation of a new block and which is then appended to the chain. Moreover, the transactions(store in blocks) are transparent and can be verified by all participants in the network.
In contrast, traditional database are typically centralize and manage by a single entity. Data in traditional database can be updated, deleted, or modified. And the access to data usually is restricted to authorized users.
```



## 操作题

安装一个 WEB3 钱包，创建账户后与 [openbuild.xyz](https://openbuild.xyz/profile) 进行绑定，截图后文件命名为 `./bind-wallet.jpg`.
