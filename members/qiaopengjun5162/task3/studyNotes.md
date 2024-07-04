# Solidity 学习笔记

## 实操

### 1. 安装

```zsh
curl -L https://foundry.paradigm.xyz | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   167  100   167    0     0    143      0  0:00:01  0:00:01 --:--:--   143
100  2189  100  2189    0     0   1271      0  0:00:01  0:00:01 --:--:--  1271
Installing foundryup...

Detected your preferred shell is zsh and added foundryup to PATH.
Run 'source /Users/qiaopengjun/.zshenv' or start a new terminal session to use foundryup.
Then, simply run 'foundryup' to install Foundry.

fofoundryup



.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx

 ╔═╗ ╔═╗ ╦ ╦ ╔╗╔ ╔╦╗ ╦═╗ ╦ ╦         Portable and modular toolkit
 ╠╣  ║ ║ ║ ║ ║║║  ║║ ╠╦╝ ╚╦╝    for Ethereum Application Development
 ╚   ╚═╝ ╚═╝ ╝╚╝ ═╩╝ ╩╚═  ╩                 written in Rust.

.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx

Repo       : https://github.com/foundry-rs/
Book       : https://book.getfoundry.sh/
Chat       : https://t.me/foundry_rs/
Support    : https://t.me/foundry_support/
Contribute : https://github.com/orgs/foundry-rs/projects/2/

.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx.xOx

foundryup: installing foundry (version nightly, tag nightly)
foundryup: downloading latest forge, cast, anvil, and chisel
############################################################################################################## 100.0%
foundryup: downloading manpages
############################################################################################################## 100.0%
foundryup: installed - forge 0.2.0 (d7eac74 2024-06-21T00:18:59.645698000Z)
foundryup: installed - cast 0.2.0 (d7eac74 2024-06-21T00:18:59.579897000Z)
foundryup: installed - anvil 0.2.0 (d7eac74 2024-06-21T00:18:59.673963000Z)
foundryup: installed - chisel 0.2.0 (d7eac74 2024-06-21T00:18:59.642077000Z)
foundryup: done!
```

## Deployment steps

1. 部署 `ERC20` 合约
2. 部署 `ERC721` 合约
3. 使用`ERC20` 合约地址作为初始化参数部署 `NFTMarket` 合约
4. 账户1 在 `ERC20` 合约上 mint token
5. 账户1 在 `ERC721` 合约上 safeMint NFT
6. 账户1 在 `ERC721` 合约上调用 `setApprovalForAll` 授权 `NFTMarket` 合约，参数为 `NFTMarket` 合约地址和 `true`
7. 账户1 在 `NFTMarket` 合约上调用 `listNFT` 挂单（上架 tokenId 为 0 的 NFT）
8. 账户1 在 `ERC20` 合约上调用 `transfer` 转移 10个 ERC20 token 给 账户2
9. 账户2 在 `ERC20` 合约上调用 `approve` 方法授权 `NFTMarket` 合约使用1个ERC20token，参数为 `NFTMarket` 合约地址 和数量 1,000,000,000,000,000,000
10. 账户2 在 `NFTMarket` 合约上调用 `buyNFT` 购买 tokenId 为 0 的 NFT
11. 查看账户1 和账户2 的 ERC20 和 ERC721 余额 （`balanceOf`）

## 学习目标

- 掌握 Solidity 语法
- 掌握 Solidity 合约开发
- 掌握 Solidity 合约部署
- 掌握 Solidity 合约调用
- 掌握 Solidity 合约测试

## 学习笔记

## 参考

- <https://getfoundry.sh/>
- <https://book.getfoundry.sh/getting-started/first-steps>
- <https://docs.soliditylang.org/en/v0.8.26/installing-solidity.html>
- <https://learnblockchain.cn/docs/solidity/index.html>
