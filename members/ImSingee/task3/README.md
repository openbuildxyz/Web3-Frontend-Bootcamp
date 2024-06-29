测试账户：
  - 账户一：0xeb4fb7818f0A5A17AD8c026B35fA3a0Fc189F639
  - 账户二：0x2390f96d3a47B508De4f8899cc6a116D630E1A0C

代币合约：
  - 地址：0x05c4e95b7a59c89eE0a0BF915631E2f5923B283b https://sepolia.etherscan.io/address/0x05c4e95b7a59c89ee0a0bf915631e2f5923b283b
  - 名称：BryanCoin BRC

NFT 合约：
  - 地址：0xB880B6594D8d398A430fc6bD42f4ea32b31cE932 https://sepolia.etherscan.io/address/0xb880b6594d8d398a430fc6bd42f4ea32b31ce932
  - 名称：BryanNFT BNFT
  - 1 号 NFT：https://testnets.opensea.io/assets/sepolia/0xB880B6594D8d398A430fc6bD42f4ea32b31cE932/1


账户 1 mint NFT （获得了 1 号 NFT） 的 transaction：https://sepolia.etherscan.io/tx/0xf6cdb26a59a229cea6540f14d2b892f5ca427a4b4d293fceeea6c9a4dc0d0dbe


市场合约
  - 地址：0x50D7869f091A7AD119cdCbe02bBfEB94F5D414FF https://sepolia.etherscan.io/address/0x50d7869f091a7ad119cdcbe02bbfeb94f5d414ff
  
账户 1 上架 1 号 NFT 到市场（价格 100）：
  - 授权给市场的 transaction：0xdc6ff08979e201680b71b50a0b73547a5e9a5be9dba1729aa74e291eae9fb538 https://sepolia.etherscan.io/tx/0xdc6ff08979e201680b71b50a0b73547a5e9a5be9dba1729aa74e291eae9fb538
  - 上架的 transaction：0x64004de397d747dc2d8781c6aaad17181f26340a74c13a297a3f4c673c1e633d https://sepolia.etherscan.io/tx/0x64004de397d747dc2d8781c6aaad17181f26340a74c13a297a3f4c673c1e633d
    - 注：存在 NFTListed 的 event

账户 2 从市场购买上述 NFT：
  - 账户 1 转账 2000 BRC 给账户 2
    - transaction：0x9ab699204775a3247609fa328a56d6b9c6c3ea9c9b026ebef6de9d1f6f937e93 https://sepolia.etherscan.io/tx/0x9ab699204775a3247609fa328a56d6b9c6c3ea9c9b026ebef6de9d1f6f937e93
    - 转账后的余额：账户 1 剩余 9998000，账户 2 剩余 2000
  - 账户 2 授权市场从自己的账户中划转 100 BRC 的 transaction：0x0de58c904e55bcd65996c1ded08813529a9164a712e5d9fbd1c1936c501b73bf https://sepolia.etherscan.io/tx/0x0de58c904e55bcd65996c1ded08813529a9164a712e5d9fbd1c1936c501b73bf
  - 账户 2 购买上述 NFT
    - transaction： 0xc56a1d4116f5d2e6249f4389480f86fe0cb45a1414d5aca0e111087ec6e85666 https://sepolia.etherscan.io/tx/0xc56a1d4116f5d2e6249f4389480f86fe0cb45a1414d5aca0e111087ec6e85666
    - 转账后的余额：账户 1 剩余 9998100，账户 2 剩余 1900
    - 确认转账后 NFT 所有权转移