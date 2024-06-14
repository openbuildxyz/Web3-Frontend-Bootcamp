// mint NFT
const constract = require('./constract.js');

async function main() {
    const nftAddress = constract.nft;

    const CargoXNFT = await ethers.getContractFactory("CargoXNFT");
    const cargoXNFT = CargoXNFT.attach(nftAddress);

    const playerAddress = "0xC309Dee6923fe9b88ec7Bc23CD8c5959218862B3";

    const tx = await cargoXNFT.mintNFT(playerAddress);
    await tx.wait();

    console.log(`NFT minted to ${playerAddress}`);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});