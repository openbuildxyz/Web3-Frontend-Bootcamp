# Task3流程 - by pseudoyu

## 具体流程

### Remix
- 部署 `OpenBuildToken (ERC20)` 合约
- 部署 `Web3FrontendToken (ERC721)` 合约
- 使用 `OpenBuildToken` 的合约地址作为初始化参数部署 `NFTExchange` 合约 
- 账户1在 `Web3FrontendToken` 上mint NFT
- 账户1调用 `Web3FrontendToken` 的 `setApprovalForAll` 函数，参数为 `NFTExchange` 的合约地址和 `true`
- 账户1调用 `NFTExchange` 合约的 `listNFT` 方法上架token id为1的NFT
- 账户1调用 `OpenBuildToken` 合约的 `transfer` 方法给账户2转100个OBT
- 账户2使用 `approve` 方法授权 `NFTEchange` 合约使用1000000个OBT的allowance
- 账户2调用 `NFTExchange` 合约的 `buyNFT` 方法购买token id为1的NFT
- 查看token id为1的NFT owner以及账户2的OBT余额 (Remix上或Etherscan上)
