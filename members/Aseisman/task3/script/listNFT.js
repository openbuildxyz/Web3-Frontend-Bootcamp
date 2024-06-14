const constract = require('./constract.js');
const nftMarketAddress = constract.market;
const nftContractAddress = constract.nft;

async function main() {
    const [deployer] = await ethers.getSigners();
    
    const tokenId = 4; 
    const price = 100n; 
  
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = NFTMarket.attach(nftMarketAddress);
  
    const MyNFT = await ethers.getContractFactory("CargoXNFT");
    const myNFT = MyNFT.attach(nftContractAddress);
    
    console.log("Approving NFT transfer...");
    let tx = await myNFT.approve(nftMarketAddress, tokenId);
    await tx.wait();
    console.log(`NFT approved: ${tx.hash}`);
  
    // List the NFT
    console.log("Listing NFT...");
    tx = await nftMarket.listNFT(nftContractAddress, tokenId, price);
    const receipt = await tx.wait();
  
    console.log(`NFT listed with token ID ${tokenId} for price ${price.toString()}`);
    console.log(`Transaction hash: ${tx.hash}`);
    console.log(`Transaction details:`, receipt);
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});