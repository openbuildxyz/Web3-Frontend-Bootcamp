import { ethers } from "hardhat";

// Provider and wallet setup
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
const accountPrivateKey = process.env.ACCOUNT3 || ""; // Use ACCOUNT3
const wallet = new ethers.Wallet(accountPrivateKey, provider);

// Contract details
const nftMarketAddress = process.env.NFT_MARKET_ADDRESS || ""; // NFT market contract address
const tokenAddress = process.env.TOKEN_ADDRESS || ""; // ERC20 token address

// Contract ABIs
const nftMarketABI = [
    "function buyNFT(uint256 listingId) external",
];
const tokenABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
];

// Create contract instances
const nftMarketContract = new ethers.Contract(nftMarketAddress, nftMarketABI, wallet);
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

async function buyNFT() {
    const listingId = 1; // Replace with the actual listing ID you want to purchase
    const price = ethers.parseUnits("1.0", 18); // Replace with the actual price of the NFT

    try {
        console.log("Approving tokens for NFT purchase...");

        // Approve the NFTMarket contract to spend your ERC20 tokens
        const approveTx = await tokenContract.approve(nftMarketAddress, price);
        console.log("Approval transaction hash:", approveTx.hash);
        await approveTx.wait();
        console.log("Tokens approved successfully!");

        console.log("Purchasing NFT...");

        // Purchase the NFT
        const buyTx = await nftMarketContract.buyNFT(listingId);
        console.log("Buy transaction hash:", buyTx.hash);
        await buyTx.wait();
        console.log("NFT purchased successfully!");
    } catch (error) {
        console.error("Error purchasing NFT:", error);
    }
}

buyNFT();
