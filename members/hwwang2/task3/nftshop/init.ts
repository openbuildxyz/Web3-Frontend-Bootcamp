import hre from "hardhat";
import { ethers } from "hardhat";
import { token } from "./typechain-types/@openzeppelin/contracts";

async function deployAll() {
    const name = "hwft";
    const symbol = "hw";
  
    // Contracts are deployed using the first signer/account by default
    const [owner, secondAccount, thirdAccount] = await hre.ethers.getSigners();

    const MyNft = await hre.ethers.getContractFactory("MyNft");
    const nft = await MyNft.deploy(name, symbol);

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const erc20 = await MyToken.deploy();

    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    const market = await NFTMarket.deploy(erc20);

    return { nft, erc20, market, owner, secondAccount, thirdAccount };
}

const main = async()=>{
    const { nft, erc20, market, owner, secondAccount, thirdAccount } = await deployAll();

    await erc20.mint({value:1000000000000000});
    await erc20.mintTo(secondAccount, 1000000000000000);
    await erc20.mintTo(thirdAccount, 1000000000000000);

    await nft.mint({value: ethers.parseEther("0.01")});
    await nft.safeMint(owner);
    await nft.safeMint(thirdAccount);
    await nft.safeMint(thirdAccount);
    await nft.safeMint(thirdAccount);
    await nft.safeMint(thirdAccount);

    await nft.approve(market, 1);
    await market.listItem(nft, 1, 1000);


    const n = await ethers.getSigners();
    await nft.connect(n[2]).mint({value: ethers.parseEther("0.01")});
    await nft.connect(n[2]).approve(market, 3);
    await market.connect(n[2]).listItem(nft, 3, 100000);
    await nft.connect(n[2]).approve(market, 4);
    await market.connect(n[2]).listItem(nft, 4, 200000);
    await nft.connect(n[2]).approve(market, 5);
    await market.connect(n[2]).listItem(nft, 5, 50000);

    console.log(await nft.getAddress());
    console.log(await erc20.getAddress());
    console.log(await market.getAddress());
}
main();