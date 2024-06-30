import { ethers } from "hardhat";

// Provider
const provider = new ethers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
// Account and wallet
const accountPrivateKey = process.env.ACCOUNT2 || "";
const wallet = new ethers.Wallet(accountPrivateKey, provider);

// NFT Market 合约
const nftMarketAddress = process.env.NFT_MARKET_ADDRESS || "";
const nftMarketABI = ["function listNFT(address nftContract, uint256 tokenId, uint256 price) external"];
const nftMarketContract = new ethers.Contract(nftMarketAddress, nftMarketABI, wallet);

// NFT 合约 ABI
const nftABI = ["function approve(address to, uint256 tokenId) external"];
const nftAddress = process.env.NFT_ADDRESS || "";
const nftContract = new ethers.Contract(nftAddress, nftABI, wallet);


async function listNFT() {
    const tokenId = 1; // 你要上架的 NFT ID
    const price = ethers.parseUnits("1.0", 18); // NFT 价格 (例如 1 ERC20 代币)
    try {
        console.log("Listing NFT...", nftContract);
        // 先授权 NFTMarket 合约可以转移你的 NFT
        const approveTx = await nftContract.approve(nftMarketAddress, tokenId);
        console.log("Approve transaction hash:", approveTx.hash);
        await approveTx.wait();

        // 上架 NFT
        const listTx = await nftMarketContract.listNFT(nftAddress, tokenId, price);
        console.log("List transaction hash:", listTx.hash);
        await listTx.wait();
        console.log("NFT listed successfully!");
    } catch (error) {
        console.error("Error listing NFT:", error);
    }
}

listNFT();
