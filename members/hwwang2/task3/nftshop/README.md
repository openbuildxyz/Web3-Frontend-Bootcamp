# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/market.ts
```

``` txt
Deployed Addresses

LockModule#Lock - 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
NFTMarketModule#MyNft - 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
NFTMarketModule#MyToken - 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318
NFTMarketModule#NFTMarket - 0x610178dA211FEF7D417bC0e6FeD39F05609AD788
```

``` ts
// 本地测试
// npx hardhat console
const MyToken = await ethers.getContractFactory('MyToken');
const token = MyToken.attach("0x8A791620dd6260079BF849Dc5567aDC3F2FdC318")
await token.mint({value:1000000000000000})
await token.mintTo("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 1000000000000000)

const MyNft = await ethers.getContractFactory('MyNft');
const nft = MyNft.attach("0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6")
await nft.mint({value: ethers.parseEther("0.01")})
await nft.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")

const NFTMarket = await ethers.getContractFactory('NFTMarket');
const market = NFTMarket.attach("0x610178dA211FEF7D417bC0e6FeD39F05609AD788")
await nft.approve("0x610178dA211FEF7D417bC0e6FeD39F05609AD788", 1)
await market.listItem(nft, 1, 1000)
await market.update(nft, 1, 2000)
await market.revoke(nft, 1)

n = await ethers.getSigners()
await nft.connect(n[1]).mint({value: ethers.parseEther("0.01")})
await nft.connect(n[1]).approve("0x610178dA211FEF7D417bC0e6FeD39F05609AD788", 8)
await market.connect(n[1]).listItem(nft, 8, 100000)

await token.approve("0x610178dA211FEF7D417bC0e6FeD39F05609AD788", 1000000)
await market.purchase(nft, 8)
```
