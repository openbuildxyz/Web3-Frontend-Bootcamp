# 流程

- 部署`OpenBuildToken`合约
- 部署`Web3FrontendToken`合约
- 使用`OpenBuildToken`的合约地址作为初始化参数部署`NFTExChange`合约
- 账户 1 在`Web3FrontendToken`上 `mintNFT`
- 账户 1 调用`web3FrontendToken`的`setApprovalForALL`函数, 参数为`NFTExchange`的合约地址和`true`
- 账户 1 调用`NFTExchange`合约的`listNFT`方法上架 token id 为 1 的 NFT
- 账户 1 调用`OpenBuildToken`合约的`transfer`方法给账户 2 转 100 个 OBT
- 账户 2 使用`approve`方法授权`NFTExchange`合约使用 1000000 个 OBT 的 allowance
- 账户 2 调用`NFTExchange`合约的`buyNFT`方法购买 token id 为 1 的 NFT
  查看 token id 为 1 的 NFT owner 以及账户 2 的 OBT 余额 (Remix 上或 Etherscan 上)

# 合约地址

- ERC20 合约地址: 0xb44e0C01EAD61cB5d4aD05D91E5ab81E2683Fe5f
- ERC721 合约地址: 0x619e6d180E67F93CDF331a9F8A70E649455f62a0
- NFTExchange 合约地址: 0xB0E358108f2804FF57283E5e5338aEA9845654Db
- List NFT 哈希: 0xd64e49f4b66914672108804fd13e4e42edf09c570226f4982b6741af44201a63
- Buy NFT 哈希: 0xf571d88f852cfb73dbae760ee2ff6cbe1f5c2348d39402bd4bf05e38902b083c
