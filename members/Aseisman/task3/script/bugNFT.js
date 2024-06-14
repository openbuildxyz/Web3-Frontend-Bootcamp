const constract = require('./constract.js');

async function main() {
    await ethers.getSigners();
    
    const nftMarketAddress = constract.market;
    const erc20TokenAddress = constract.token;
    const listingId = 0;  
  
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = NFTMarket.attach(nftMarketAddress);
  
    const ERC20Token = await ethers.getContractFactory("CargoXToken");
    const eRC20Token = ERC20Token.attach(erc20TokenAddress);

    const price = 200n;  
    console.log("Approving ERC20 token transfer...");
    try {
      let tx = await eRC20Token.approve(nftMarketAddress, price);
      await tx.wait();
      console.log(`ERC20 token approved: ${tx.hash}`);
    } catch (error) {
      console.error("Error during ERC20 token approval:", error);
      return;
    }
  
    console.log("Purchasing NFT...");
    try {
      const tx = await nftMarket.purchaseNFT(listingId);
      const receipt = await tx.wait();
  
      console.log(`NFT purchased with listing ID ${listingId}`);
      console.log(`Transaction hash: ${tx.hash}`);
      console.log(`Transaction details:`, receipt);
    } catch (error) {
      console.error("Error during NFT purchase:", error);
    }
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});