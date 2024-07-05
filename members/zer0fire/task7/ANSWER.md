--contractAccount 0x686e31729706b946023A3b4a63801aEf34881e0f
--contractAddress 0x5a998785a29Ca7353c0654d9e1d8D1641167f69a
== deployed aspectID == 0xFce98BBB2C27C9620B0F00E375Ff8FA0806e155f
-- aspectAddress: 0xFce98BBB2C27C9620B0F00E375Ff8FA0806e155f
-- bind hash: 0xec15693df17898834711681007044cbde6cf874a935ba18a51319005e832af13

踩坑：

1. `solc` 不能执行，报错
   需要安装 `solidity`，网上有很多说直接 `npm` 安装，都不靠谱

```shell
$ brew install solidity，
```

2. 没有 `query.cjs`
   用这个 `scripts/get-bound-aspect.cjs`

```shell
node scripts/get-bound-aspect.cjs --contract 0x5a998785a29Ca7353c0654d9e1d8D1641167f69a
```
