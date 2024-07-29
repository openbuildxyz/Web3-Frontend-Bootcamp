# nftmarketdemo

| Type   | Address                                    | Link |
| ------ | ------------------------------------------ | ---- |
| Erc20  | 0x8CCfD025196418Cf57185006cA73b8b2a9dcFfb4 |      |
| Nft721 | 0x9850Af3343491657B03381170590B86EB61Bcd9E |      |
| Market | 0x0aBbA428764f57c8bCC07C92A4eEbe3e78Df3735 |      |
| Owner  | 0xb4C3DF96E621174B4ADED06b91fb2EbEC33891EA |      |

## build local contract

获取 hardhat 测试账号,build environment

`npx hardhat node`

deploy the contract on local

`npx hardhat run src/backend/scripts/deploy.js --network localhost`

问题记录

1.走 deploy 的时候，编译报错，`Uncaught TypeError: ethers.getSigner is not a function`

- 先确认安装了 etherjs
- `hardhat.config` 文件，引入 `require('@nomiclabs/hardhat-waffle')`;

2. TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')
   https://ethereum.stackexchange.com/questions/144451/typeerror-cannot-read-properties-of-undefined-reading-jsonrpcprovider
   降低 etherjs version

`npx hardhat console --network localhost `

is an interactive js environment for interacting with our contract and blockchain

![](https://s2.loli.net/2024/06/24/PSW9sKYeGALxRgU.png)

// in terminal
`const contract1 = await ethers.getContractAt("cUSDT","0xdc64a140aa3e981100a9beca4e685f962f0cf6c9");`
`console.log(contract1)`

// in terminal
`const name = await contract1.name()`
`name`
