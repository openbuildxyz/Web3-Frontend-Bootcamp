const fs = require("fs");

async function main() {
    const [deployer, addr1] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.attach('0x005d3A77B67e951540810e29ac3ba46bE9e61282');
    console.log("Using MyToken at:", myToken.address);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.attach('0x691d32c0f26aFf9188aAF258Cf8036eA9eD2Bccf');
    console.log("Using MyNFT at:", myNFT.address);

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.attach('0xEa9031966A0B41C8DDC94Ba2Ace4D22E91DFab95');
    console.log("Using NFTMarket at:", nftMarket.address);

    // 铸造NFT
    let tx = await myNFT.mintNFT(deployer.address, { gasLimit: 3000000 });
    let receipt = await tx.wait();
    let tokenId = receipt.events[0].args.tokenId.toNumber();
    console.log("Mint NFT transaction hash:", tx.hash);

    // 上架NFT
    await myNFT.approve(nftMarket.address, tokenId, { gasLimit: 3000000 });
    const price = ethers.utils.parseUnits("10", 18);
    tx = await nftMarket.listNFT(tokenId, price, { gasLimit: 3000000 });
    receipt = await tx.wait();
    console.log("List NFT transaction hash:", tx.hash);

    tx = await nftMarket.getListedNFTs();
    console.log("getListedNFTs:", tx);

    // const NFTMarket = await ethers.getContractFactory("NFTMarket");
    // const nftMarket = await NFTMarket.deploy(myToken.address, myNFT.address);
    // await nftMarket.deployed();
    // console.log("NFTMarket deployed to:", nftMarket.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
