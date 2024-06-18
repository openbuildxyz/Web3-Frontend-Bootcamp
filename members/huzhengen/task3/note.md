# note

1. 部署 Token 合约
2. 部署 NFT 合约
3. 以 Token 合约地址作为参数部署 Exchange 合约
4. 账户 1 在 NFT 上 mint NFT
5. 账户 1 调用 NFT 的 setApprovalForAll 方法，参数是 Exchange 合约地址和 true
6. 账户 1 调用 NFT 的 listNFT 方法，上架 tokenId 为 1 的 NFT
7. 账户 1 调用 Token 合约的 transfer 方法 给账户 2 转 100 个 ANT
8. 账户 2 调用 approve 方法授权 Exchange 合约使用 1000000 个 ANT 的 allowance
9. 账户 2 调用 Exchange 合约的 buyNFT 方法购买 tokenId 为 1 的 NFT
10. 查看 tokenId 为 1 的 owner 以及账户 2 的 ANT 余额

AllenToken 合约：https://sepolia.etherscan.io/tx/0x0ec616b435c4c24c7f5667f602323693c81b7332c77cec392e1db50637c8ae0b

AllenNFTToken 合约：https://sepolia.etherscan.io/tx/0x3c03a335821effd1d7732d06257c70537b205e3544547c6d5e4571788f750e7e

AllenNFTExchange 合约：https://sepolia.etherscan.io/tx/0x37fa71c540f1dba7d7ec97571141bb860310bb528704ed6722aa52b08c45a7da

账户 1 mint 1 个 NFT：https://sepolia.etherscan.io/tx/0x1c74d2d3a3eafdd38684fd96e3b6ced61a44634d4d51a5e6c6e3968ccb44acc8

账户 1 调用 NFT 的 setApprovalForAll 方法：https://sepolia.etherscan.io/tx/0x72a924e3ee447940b5065040fa1e46fa566a4675d59211fd4f8a6527dd0afddf

账户 1 上架 tokenId 为 1 的 NFT：https://sepolia.etherscan.io/tx/0xad9c682732a833bd92786a97d7098114463b7b47812322a053ab1573ae2b0c0e

账户 1 给 账户 2 转了 100 个 ANT：https://sepolia.etherscan.io/tx/0x9d4b02e7bf0ab5973ddce34dfe6d9887d3b0d304c0ba1b044b0285d74159baee

账户 2 调用 approve 方法授权 Exchange 合约使用 1 个 ANT：https://sepolia.etherscan.io/tx/0x3c08d186bc5bebac6fdf991a55eed93117ccb713bc90a5dea362f9d05a3ab050

账户 2 买了 tokenId 为 1 的 NFT：https://sepolia.etherscan.io/tx/0x6979a1354d122869cbbd5d4e160223761ded8216ea9b22c04d86955bd5025013